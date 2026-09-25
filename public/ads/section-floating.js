(function () {
  const path = location.pathname;
  const scholarship = /^\/(?:en\/)?scholarships\/?$/.test(path);
  const study = /^\/(?:en\/)?study-abroad\/(?:$|index\.html$|countries\/[^/]+\.html$)/.test(path);
  const news = /^\/(?:en\/)?news\/?$/.test(path);
  const domestic = /^\/(?:en\/)?taiwan-universities\/?$/.test(path);
  const peter = /^\/(?:en\/)?peter\/?$/.test(path);
  if (!scholarship && !study && !news && !domestic && !peter) return;
  const preview = new URLSearchParams(location.search).get('ad-preview') === '1';
  const english = document.documentElement.lang.toLowerCase().startsWith('en') || path.startsWith('/en/');
  const ad = document.createElement('aside');
  ad.className = 'news-floating-ad';
  ad.dataset.adPlacement = scholarship ? 'F-S' : study ? 'F-C' : news ? 'F-N' : domestic ? 'F-U' : 'P-S';
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
  title.textContent = scholarship ? (english ? 'Scholarship advertising' : '國際獎學金廣告版位')
    : study ? (english ? 'Study abroad advertising' : '海外大學招生廣告版位')
    : domestic ? (english ? 'Taiwan university advertising' : '國內大學招生廣告版位')
    : peter ? (english ? 'Education lecture advertising' : 'Peter 講座廣告版位')
    : (english ? 'Education news advertising' : '最新教育新聞廣告版位');
  const description = document.createElement('p');
  description.textContent = scholarship ? (english ? 'Introduce funding opportunities to interested readers.' : '向查找獎學金的學生介紹資助機會。')
    : study ? (english ? 'Present programmes to students planning overseas study.' : '向規劃留學的學生介紹課程與招生活動。')
    : domestic ? (english ? 'Present admissions events to students comparing Taiwan universities.' : '向比較台灣大學的學生介紹招生活動。')
    : peter ? (english ? 'Reach readers of international education analysis.' : '向閱讀國際教育專欄的學生介紹學校與講座。')
    : (english ? 'Reach readers following education news.' : '向閱讀國際教育新聞的學生介紹學校與活動。');
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
