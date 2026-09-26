(function () {
  const ad = document.querySelector('.news-floating-ad');
  if (!ad) return;
  const preview = new URLSearchParams(location.search).get('ad-preview') === '1';

  const english = document.documentElement.lang.toLowerCase().startsWith('en') || location.pathname.startsWith('/en/');
  if (english) {
    ad.setAttribute('aria-label', 'Advertisement');
    ad.querySelector('button').setAttribute('aria-label', 'Close advertisement');
    ad.querySelector('.news-floating-ad-label').textContent = 'ADVERTISEMENT';
    ad.querySelector('img').alt = 'UWE Bristol recruitment advertisement featuring the Clifton Suspension Bridge';
    ad.querySelector('strong').textContent = 'UWE Bristol | Turn learning into a real career';
    ad.querySelector('p').textContent = 'Practical learning, industry connections and modern facilities in Bristol, one of the UK’s most creative cities.';
    ad.querySelector('.news-floating-ad-cta').textContent = 'Explore UWE Bristol ↗';
  }
  ad.querySelector('button').addEventListener('click', () => {
    ad.remove();
  });
  if (preview) ad.hidden = false;
  else window.setTimeout(() => { if (ad.isConnected) ad.hidden = false; }, 1500);
})();
