(function () {
  const page = location.pathname;
  // The ad stays outside the decision tools and their forms.
  if (!/^\/(?:en\/)?study-abroad\/(?:$|index\.html$|countries\/[^/]+\.html$)/.test(page)) return;
  const country = page.includes('/countries/');
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const slot = document.createElement('aside');
  slot.className = 'education-ad';
  slot.setAttribute('aria-label', '廣告');
  slot.dataset.adPlacement = country ? 'C2' : 'C1';
  slot.innerHTML = english
    ? '<div class="education-ad-label">ADVERTISEMENT</div><div class="education-ad-body"><div><strong>University advertising</strong><p>Reach students as they explore study destinations and programmes.</p></div><a href="/en/advertise/">Enquire about this space ↗</a></div>'
    : '<div class="education-ad-label">ADVERTISEMENT · 廣告</div><div class="education-ad-body"><div><strong>大學與國際教育招生合作</strong><p>向正在規劃留學的學生介紹課程與招生活動。</p></div><a href="/advertise/">洽詢此版位 ↗</a></div>';
  const main = document.querySelector('main');
  const firstSection = main?.querySelector('section');
  if (firstSection) firstSection.insertAdjacentElement('afterend', slot);

  const key = 'globalednews-floating-ad-closed';
  const preview = new URLSearchParams(location.search).get('ad-preview') === '1';
  let dismissed = false;
  try { dismissed = sessionStorage.getItem(key) === '1'; } catch {}
  if (dismissed && !preview) return;
  const float = document.createElement('aside');
  float.className = 'education-ad-float';
  float.dataset.adPlacement = 'F';
  float.setAttribute('aria-label', english ? 'Advertisement' : '廣告');
  float.hidden = true;
  float.innerHTML = english
    ? '<button class="education-ad-close" type="button" aria-label="Close advertisement">×</button><div class="education-ad-label">ADVERTISEMENT</div><img src="/study-abroad/ad-university.svg" width="540" height="232" alt="University advertising space"><strong>Reach prospective students</strong><p>University programmes and admissions events.</p><a href="/en/advertise/">Advertising enquiries ↗</a>'
    : '<button class="education-ad-close" type="button" aria-label="關閉廣告">×</button><div class="education-ad-label">ADVERTISEMENT · 廣告</div><img src="/study-abroad/ad-university.svg" width="540" height="232" alt="大學招生廣告版位"><strong>讓學生看見您的學校</strong><p>大學招生與說明會合作版位。</p><a href="/advertise/">了解廣告合作 ↗</a>';
  document.body.append(float);
  float.querySelector('button').addEventListener('click', () => {
    float.remove();
    try { sessionStorage.setItem(key, '1'); } catch {}
  });
  const reveal = () => {
    if ((preview || window.scrollY > (window.innerWidth > 760 ? 240 : 400)) && document.body.contains(float)) float.hidden = false;
  };
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
})();
