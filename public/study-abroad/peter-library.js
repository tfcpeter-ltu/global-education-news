(() => {
  const loadBook = () => new Promise((resolve) => {
    if (window.PETER_BOOK_ARTICLES) return resolve();
    const script = document.createElement('script');
    script.src = 'peter-book-data.js';
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });

  loadBook().then(() => {
    const d = window.STUDY_NAV_DATA || {};
    const all = (d.articles || []).filter((x) => x.kind === 'Peter文章');
    const bookCount = all.filter((x) => x.bookNumber).length;
    const labels = { uk: '英國', us: '美國', canada: '加拿大', australia: '澳洲', europe: '歐洲', japan: '日本', singapore: '新加坡', 'hong-kong': '香港', global: '跨國／教育專題' };
    const tagNames = { uk: '英國', us: '美國', canada: '加拿大', australia: '澳洲', europe: '歐洲', japan: '日本', singapore: '新加坡', 'hong-kong': '香港' };
    const order = ['uk', 'us', 'canada', 'australia', 'singapore', 'europe', 'japan', 'hong-kong', 'global'];
    const fbPage = 'https://www.facebook.com/profile.php?id=61585164670358';
    const root = document.getElementById('peter-library');
    const count = document.getElementById('peter-count');
    const resultCount = document.getElementById('peter-filter-count');
    const q = document.getElementById('peter-q');
    const countryF = document.getElementById('peter-country-filter');
    const typeF = document.getElementById('peter-type-filter');
    const stageF = document.getElementById('peter-stage-filter');
    const compareF = document.getElementById('peter-compare-filter');
    const sourceF = document.getElementById('peter-source-filter');
    const intro = document.querySelector('.page-intro p');
    if (intro) intro.textContent = '《Peter の國際教育講座》第一集 50 篇已完整收錄，依英國、美國、加拿大、澳洲、新加坡與跨國教育專題整理。你可以用國家、文章類型、申請階段與關鍵字快速查找。';
    if (sourceF && !sourceF.querySelector('option[value="book"]')) sourceF.insertAdjacentHTML('afterbegin', '<option value="book">第一集完整文章</option>');
    if (count) count.textContent = `目前共整理 ${all.length} 篇，包含《看懂制度，選對世界》第一集 ${bookCount} 篇完整文章。`;
    if (!root) return;

    const sourceMeta = (x) => {
      if (x.bookNumber) return { key: 'book', platform: '第一集完整文章', link: x.originalUrl ? '附 Facebook 原始貼文' : '原始連結待補' };
      const u = x.url || '';
      if (u.includes('facebook.com')) return { key: 'facebook', platform: 'Facebook 原始貼文', link: '原始貼文直連已確認' };
      if (u.includes('ltuedu.net')) return { key: 'blog', platform: /\/l\//.test(u) ? 'LTU Blog 文章' : 'LTU Blog 目錄', link: /\/l\//.test(u) ? (x.linkChecked ? `原文連結核對：${x.linkChecked}` : '原文連結待重新核對') : '個別文章直連待補' };
      return { key: 'pending', platform: 'Peter 的國際教育講座', link: '原始貼文直連待補' };
    };
    const compareMode = (x) => {
      const t = [x.articleType || '', ...(x.tags || [])].join(' ');
      if (/橫向|跨國|跨校|比較/.test(t) && !/路徑|階段|進程/.test(t)) return 'horizontal';
      if (/縱向|路徑|階段|銜接|Foundation|Diploma|Pathway|學制/.test(t)) return 'vertical';
      return 'single';
    };
    const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh-Hant'));
    uniq(all.map((x) => x.articleType)).forEach((v) => typeF && typeF.insertAdjacentHTML('beforeend', `<option value="${v}">${v}</option>`));
    uniq(all.map((x) => x.stage)).forEach((v) => stageF && stageF.insertAdjacentHTML('beforeend', `<option value="${v}">${v}</option>`));

    const params = new URLSearchParams(location.search);
    if (q && params.get('q')) q.value = params.get('q');
    if (countryF && params.get('country')) countryF.value = params.get('country');
    if (typeF && params.get('type')) typeF.value = params.get('type');
    if (stageF && params.get('stage')) stageF.value = params.get('stage');
    if (compareF && params.get('compare')) compareF.value = params.get('compare');
    if (sourceF && params.get('source')) sourceF.value = params.get('source');

    const aliases = { 'computer science': '電腦|資訊|計算', ai: '人工智慧|人工智能', 'data science': '資料科學|數據', engineering: '工程', business: '商學|商科', finance: '金融|財務', accounting: '會計', psychology: '心理', medicine: '醫學|醫科', dentistry: '牙醫|牙科', pharmacy: '藥學', 'biomedical sciences': '生物醫學', 'art & design': '藝術|設計', animation: '動畫', 'film production': '電影|影視', architecture: '建築', fashion: '時尚', 'music performance': '音樂|表演', 'music production': '音樂|製作', communication: '傳播|媒體' };
    const searchable = (x) => [x.title, x.description, x.major, x.articleType, x.stage, x.status, ...(x.tags || [])].filter(Boolean).join(' ').toLowerCase();
    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    const card = (x, country) => {
      const cross = x.country === 'global' && country !== 'global';
      const source = sourceMeta(x);
      const mode = compareMode(x);
      const modeLabel = mode === 'horizontal' ? '橫向比較' : mode === 'vertical' ? '縱向比較' : '單一主題／學校';
      const cover = x.image ? `<a class="peter-card-cover" href="${escapeHtml(x.url)}"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.imageAlt || x.title)}" loading="lazy"></a>` : '';
      return `<article class="peter-card${x.bookNumber ? ' peter-book-card' : ''}">${cover}<div class="peter-card-content"><div class="peter-meta"><span>${x.bookNumber ? `第一集 ${String(x.bookNumber).padStart(2, '0')}` : (cross ? '跨國延伸' : (labels[x.country] || x.country))}</span><span>${escapeHtml(x.articleType || '')}</span><span>${escapeHtml(x.stage || '')}</span><span>${modeLabel}</span><span>${source.platform}</span></div><h3>${escapeHtml((x.title || '').replace('Peter延伸｜', '').replace('Peter歷史文章｜', ''))}</h3><p>${escapeHtml(x.description || x.major || '')}</p>${Array.isArray(x.tags) ? `<div class="peter-tags">${x.tags.map((t) => `<em>${escapeHtml(t)}</em>`).join('')}</div>` : ''}<a href="${escapeHtml(x.url)}">${x.bookNumber ? '閱讀完整文章' : ((x.url || '').includes('ltuedu.net') && !/\/l\//.test(x.url || '') ? '前往文章目錄（直連待補）' : '閱讀 Peter 原文')} →</a></div></article>`;
    };
    const matches = (x) => {
      const term = (q?.value || '').trim().toLowerCase();
      if (term && !(searchable(x).includes(term) || (aliases[term] && new RegExp(aliases[term]).test(searchable(x))))) return false;
      if (countryF?.value) {
        const country = countryF.value;
        if (x.country !== country && !(x.country === 'global' && country !== 'global' && Array.isArray(x.tags) && x.tags.includes(tagNames[country]))) return false;
      }
      if (typeF?.value && x.articleType !== typeF.value) return false;
      if (stageF?.value && x.stage !== stageF.value) return false;
      if (compareF?.value && compareMode(x) !== compareF.value) return false;
      if (sourceF?.value && sourceMeta(x).key !== sourceF.value) return false;
      return true;
    };
    const syncUrl = () => {
      const p = new URLSearchParams();
      if (q?.value.trim()) p.set('q', q.value.trim());
      if (countryF?.value) p.set('country', countryF.value);
      if (typeF?.value) p.set('type', typeF.value);
      if (stageF?.value) p.set('stage', stageF.value);
      if (compareF?.value) p.set('compare', compareF.value);
      if (sourceF?.value) p.set('source', sourceF.value);
      history.replaceState(null, '', `${location.pathname}${p.toString() ? `?${p}` : ''}${location.hash || ''}`);
    };
    const render = () => {
      root.innerHTML = '';
      const filtered = all.filter(matches);
      if (resultCount) resultCount.textContent = `符合條件 ${filtered.length} 篇／已整理 ${all.length} 篇`;
      if (!filtered.length) {
        root.innerHTML = '<div class="peter-empty">目前沒有符合條件的文章，請放寬一個篩選條件。</div>';
        syncUrl();
        return;
      }
      const rowsFor = (country) => country === 'global' ? filtered.filter((x) => x.country === 'global') : filtered.filter((x) => x.country === country || (x.country === 'global' && Array.isArray(x.tags) && x.tags.includes(tagNames[country])));
      order.forEach((country) => {
        const rows = rowsFor(country).sort((a, b) => (a.bookNumber && b.bookNumber) ? a.bookNumber - b.bookNumber : (b.sourceDate || '').localeCompare(a.sourceDate || ''));
        if (!rows.length) return;
        root.insertAdjacentHTML('beforeend', `<section class="peter-country" id="peter-${country}"><div class="peter-country-head"><span>Peter Article Library</span><h2>${labels[country]}</h2><p>${country === 'global' ? '跨國科系比較、教育觀點與生涯分析。' : '依國家整理制度、申請、政策、科系與留學現場文章。'}</p></div><div class="peter-grid">${rows.map((x) => card(x, country)).join('')}</div></section>`);
      });
      root.insertAdjacentHTML('beforeend', `<section class="peter-country"><div class="peter-note"><strong>Facebook 原始來源</strong><p>《看懂制度，選對世界》所附的 Facebook 永久連結已保留；原始文件未附直連的篇目會明確標示，不以猜測網址代替。</p><a href="${fbPage}" target="_blank" rel="noopener">前往 Peter 的國際教育講座 Facebook →</a></div></section>`);
      syncUrl();
    };
    [q, countryF, typeF, stageF, compareF, sourceF].filter(Boolean).forEach((el) => el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', render));
    render();
  });
})();
