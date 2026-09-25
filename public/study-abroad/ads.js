(function () {
  const page = location.pathname;
  // The ad stays outside the decision tools and their forms.
  if (!/^\/(?:en\/)?study-abroad\/(?:$|index\.html$|countries\/[^/]+\.html$)/.test(page)) return;
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const slot = document.createElement('aside');
  slot.className = 'education-ad';
  slot.setAttribute('aria-label', '廣告');
  slot.dataset.adPlacement = 'C1';
  slot.innerHTML = english
    ? '<div class="education-ad-label">ADVERTISEMENT</div><div class="education-ad-body"><div><strong>University advertising</strong><p>Reach students as they explore study destinations and programmes.</p></div><a href="/en/advertise/">Enquire about this space ↗</a></div>'
    : '<div class="education-ad-label">ADVERTISEMENT · 廣告</div><div class="education-ad-body"><div><strong>大學與國際教育招生合作</strong><p>向正在規劃留學的學生介紹課程與招生活動。</p></div><a href="/advertise/">洽詢此版位 ↗</a></div>';
  const main = document.querySelector('main');
  const firstSection = main?.querySelector('section');
  if (!page.includes('/countries/') && firstSection) firstSection.insertAdjacentElement('afterend', slot);
  const lower = slot.cloneNode(true);
  lower.dataset.adPlacement = 'C2';
  lower.classList.add('education-ad-bottom');
  if (main) main.append(lower);
})();
