(() => {
  const loadBook = () => new Promise((resolve) => {
    if (window.PETER_BOOK_ARTICLES) return resolve();
    const script = document.createElement('script');
    script.src = '../peter-book-data.js';
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });
  loadBook().then(() => {
    const d = window.STUDY_NAV_DATA || {};
    const root = document.getElementById('country-peter');
    if (!root) return;
    const country = root.dataset.country || document.body.dataset.country || '';
    const label = root.dataset.label || '';
    const tagMap = { uk: '英國', us: '美國', canada: '加拿大', australia: '澳洲', europe: '歐洲', japan: '日本', singapore: '新加坡', 'hong-kong': '香港' };
    const rows = (d.articles || []).filter((x) => x.kind === 'Peter文章' && (x.country === country || (x.country === 'global' && Array.isArray(x.tags) && x.tags.includes(tagMap[country])))).sort((a, b) => (a.bookNumber && b.bookNumber) ? a.bookNumber - b.bookNumber : (b.sourceDate || '').localeCompare(a.sourceDate || ''));
    if (!rows.length) {
      root.innerHTML = '<p>Peter 相關文章正在整理中。</p>';
      return;
    }
    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    const cards = rows.map((x) => `<article class="guide-card"><span class="tag">${x.bookNumber ? `第一集 ${String(x.bookNumber).padStart(2, '0')}` : (x.country === 'global' ? '跨國延伸' : 'Peter 的國際教育講座')}</span><h3>${escapeHtml((x.title || '').replace('Peter延伸｜', '').replace('Peter歷史文章｜', ''))}</h3><p>${escapeHtml(x.description || x.articleType || x.major || '')}</p><p><small>${escapeHtml(x.status || '')}</small></p><a href="${x.bookNumber ? '../' : ''}${escapeHtml(x.url)}">${x.bookNumber ? '閱讀完整文章' : '閱讀 Peter 原文'} →</a></article>`).join('');
    root.innerHTML = `<div class="section-heading"><div><span class="overline">Peter Article Library</span><h2>Peter 的國際教育講座｜${label || tagMap[country] || ''}延伸閱讀</h2></div><p>從 Peter 的完整文章延伸理解申請制度、科系選擇、政策、就業與留學現場。</p></div><div class="guide-grid">${cards}</div><p style="margin-top:18px"><a class="dark-outline" href="../peter-library.html?country=${country}#peter-${country}">查看更多 Peter 文章 →</a></p>`;
  });
})();
