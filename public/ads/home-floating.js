(function () {
  const ad = document.querySelector('.news-floating-ad');
  if (!ad) return;
  const preview = new URLSearchParams(location.search).get('ad-preview') === '1';

  const english = document.documentElement.lang.toLowerCase().startsWith('en') || location.pathname.startsWith('/en/');
  if (english) {
    ad.setAttribute('aria-label', 'Advertisement');
    ad.querySelector('button').setAttribute('aria-label', 'Close advertisement');
    ad.querySelector('.news-floating-ad-label').textContent = 'ADVERTISEMENT';
    ad.querySelector('img').alt = 'University advertising space';
    ad.querySelector('strong').textContent = 'University advertising space';
    ad.querySelector('p').textContent = 'Introduce your university to readers exploring international education.';
    const link = ad.querySelector('a');
    link.href = '/en/advertise/';
    link.textContent = 'Advertising enquiries ↗';
  }
  ad.querySelector('button').addEventListener('click', () => {
    ad.remove();
  });
  const reveal = () => {
    if (preview || window.scrollY > 420) ad.hidden = false;
  };
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
})();
