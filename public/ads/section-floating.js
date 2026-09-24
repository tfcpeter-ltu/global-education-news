(function () {
  const path = location.pathname;
  const scholarship = /^\/(?:en\/)?scholarships\/?$/.test(path);
  const study = /^\/(?:en\/)?study-abroad\/(?:$|index\.html$|countries\/[^/]+\.html$)/.test(path);
  if (!scholarship && !study) return;
  const section = scholarship ? 'scholarships' : 'study-abroad';
  const preview = new URLSearchParams(location.search).get('ad-preview') === '1';
  const english = document.documentElement.lang.toLowerCase().startsWith('en') || path.startsWith('/en/');
  const ad = document.createElement('aside');
  ad.className = 'news-floating-ad';
  ad.dataset.adPlacement = scholarship ? 'F-S' : 'F-C';
  ad.setAttribute('aria-label', english ? 'Advertisement' : '廣告');
  ad.hidden = true;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'news-floating-ad-close';
  close.setAttribute('aria-label', english ? 'Close advertisement' : '關閉廣告');
  close.textContent = '×';
  const label = document.createElement('div');
  label.className = 'news-floating-ad-label';
  label.textContent = english ? 'ADVERTISEMENT' : 'ADVERTISEMENT · 廣告';
  const image = document.createElement('img');
  image.src = '/study-abroad/ad-university.svg';
  image.width = 540;
  image.height = 232;
  image.alt = english ? 'University advertising example' : '大學招生廣告示意圖';
  const title = document.createElement('strong');
  title.textContent = scholarship
    ? (english ? 'Scholarship programme advertising' : '國際獎學金廣告版位')
    : (english ? 'Study abroad programme advertising' : '海外大學招生廣告版位');
  const description = document.createElement('p');
  description.textContent = scholarship
    ? (english ? 'Present verified university funding opportunities to interested readers.' : '向正在查找獎學金的學生介紹學校資助資訊。')
    : (english ? 'Introduce programmes and admissions events to students planning overseas study.' : '向正在規劃留學的學生介紹課程與招生活動。');
  const link = document.createElement('a');
  link.href = english ? '/en/advertise/' : '/advertise/';
  link.textContent = english ? 'Advertising enquiries ↗' : '了解廣告合作 ↗';
  ad.append(close, label, image, title, description, link);
  document.body.append(ad);
  close.addEventListener('click', () => {
    ad.remove();
  });
  if (preview) ad.hidden = false;
  else window.setTimeout(() => { if (ad.isConnected) ad.hidden = false; }, 1500);
})();
