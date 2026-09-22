(() => {
  const version = new URL(document.currentScript.src).search;
  const english = location.pathname.startsWith('/en/');
  const original = english ? location.pathname.slice(3) : location.pathname;
  const storageKey = 'globalednews-language';
  const readPreference = () => { try { return localStorage.getItem(storageKey); } catch { return null; } };
  const savePreference = value => { try { localStorage.setItem(storageKey, value); } catch {} };
  document.querySelectorAll('[data-language]').forEach(link => {
    const target = new URL(link.href);
    target.search = location.search; target.hash = location.hash; link.href = target.href;
    link.addEventListener('click', () => {
      // Filters can update the URL after page load using history.replaceState.
      const currentTarget = new URL(link.href);
      currentTarget.search = location.search; currentTarget.hash = location.hash;
      link.href = currentTarget.href;
      savePreference(link.dataset.language);
    });
  });
  if (!english) {
    if (readPreference() === 'en') location.replace('/en' + original + location.search + location.hash);
    return;
  }
  savePreference('en');
  const chinese = /[\u3400-\u9fff]/;
  const normalize = value => String(value).replace(/\s+/g, ' ').trim();
  const skip = 'script,style,code,pre,textarea,svg,[translate="no"],.notranslate,[contenteditable="true"],[data-private]';
  Promise.all([
    fetch('/bilingual-dictionary.json' + version).then(r => { if (!r.ok) throw Error('Dictionary unavailable'); return r.json(); }),
    fetch('/bilingual-routes.json' + version).then(r => { if (!r.ok) throw Error('Routes unavailable'); return r.json(); })
  ]).then(([dictionary, paths]) => {
    const routes = new Set(paths);
    const translate = value => {
      if (!chinese.test(value)) return value;
      const key = normalize(value);
      const patterns = [
        [/^免費版開放 (\d+) 間大學。$/, 'The free version includes $1 universities.'],
        [/^註冊後可再解鎖 (\d+) 間，搜尋完整 (\d+) 間大學，並雲端保存查詢與規劃結果。$/, 'Register free to unlock $1 more universities, search all $2, and save your searches and plans to the cloud.'],
        [/^找到 (\d+) 間資料庫中的大學。先收藏真正願意深入研究的學校，再到「我的選校」追蹤申請進度。$/, '$1 universities found. Save the universities you want to explore, then track your applications in My shortlist.']
      ];
      for (const [pattern, replacement] of patterns) if (pattern.test(key)) return key.replace(pattern, replacement);
      const exact = dictionary[key];
      if (exact) return value.replace(value.trim(), exact);
      // Template fragments (e.g. a live count) retain their numeric values.
      return value.replace(/[\u3400-\u9fff]+/g, part => dictionary[part] ? ' ' + dictionary[part] + ' ' : part);
    };
    const localizeLink = el => {
      if (!el.href || el.hasAttribute('data-language') || el.closest('[translate="no"]')) return;
      const u = new URL(el.href, location.href);
      if (u.origin === location.origin && routes.has(u.pathname)) {
        u.pathname = '/en' + u.pathname;
        if (el.href !== u.href) el.href = u.href;
      }
    };
    const translateNode = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentElement && !node.parentElement.closest(skip)) {
          const bilingualOption = node.parentElement.tagName === 'OPTION' && node.data.match(/^[\s\S]*[\u3400-\u9fff][\s\S]* · ([A-Za-z][^\u3400-\u9fff]+)$/);
          const next = bilingualOption ? bilingualOption[1].trim() : translate(node.data); if (next !== node.data) node.data = next;
        }
        return;
      }
      if (!(node instanceof Element) || node.matches(skip) || node.closest(skip)) return;
      // Option values are application data, not presentation text.
      if (node.tagName === 'OPTION' && !node.hasAttribute('value')) node.setAttribute('value', node.textContent);
      for (const key of ['title','alt','aria-label','placeholder']) {
        if (node.hasAttribute(key)) { const before = node.getAttribute(key); const after = translate(before); if (before !== after) node.setAttribute(key, after); }
      }
      if (node.tagName === 'A') localizeLink(node);
      for (const child of [...node.childNodes]) translateNode(child);
    };
    const observer = new MutationObserver(records => {
      observer.disconnect();
      for (const record of records) {
        if (record.type === 'characterData' || record.type === 'attributes') translateNode(record.target);
        else for (const node of record.addedNodes) translateNode(node);
      }
      observe();
    });
    const observe = () => observer.observe(document.body, {subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','alt','aria-label','placeholder']});
    translateNode(document.body); observe();
    document.documentElement.dataset.translationReady = 'true';
  }).catch(() => {
    // Static English articles remain readable even when dynamic translation fails.
    document.documentElement.dataset.translationReady = 'unavailable';
  });
})();
