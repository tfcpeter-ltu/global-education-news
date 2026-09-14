const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.querySelector('#dots');
let current = 0;
let timer;

const ids = slides.map(s => s.dataset.imageId);
const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicateIds.length) console.error('Duplicate hero image IDs blocked:', duplicateIds);

slides.forEach((slide, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `前往第 ${i + 1} 張`);
  dot.addEventListener('click', () => show(i));
  dotsWrap.appendChild(dot);
});

function show(index){
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
  restart();
}
function restart(){ clearInterval(timer); timer = setInterval(() => show(current + 1), 6500); }
document.querySelector('#prev').addEventListener('click', () => show(current - 1));
document.querySelector('#next').addEventListener('click', () => show(current + 1));
restart();
