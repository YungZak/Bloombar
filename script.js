// Header: transparent over hero, cream once scrolled
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile navigation
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  document.body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mainNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ============ Portfolio ============
// To add a category: append photos here with a new `cat`,
// then add a matching <button data-filter="..."> in index.html.
const CATEGORIES = {
  'full-service': {
    dir: 'images/Full_service_wedding/',
    files: [
      'IMG_2843.JPG', 'IMG_5688.JPEG', 'IMG_5739.JPG', 'IMG_5703.JPEG',
      'IMG_2874.JPG', 'IMG_5709.JPEG', 'IMG_5744.JPG', 'IMG_5690.JPEG',
      'IMG_2848.JPG', 'IMG_5712.JPEG', 'IMG_5740.JPG', 'IMG_5704.JPEG',
      'IMG_2877.JPG', 'IMG_5698.JPEG', 'IMG_5745.JPG', 'IMG_5710.JPEG',
      'IMG_5741.JPG', 'IMG_5705.JPEG', 'IMG_5746.JPG', 'IMG_5713.JPEG',
    ],
  },
  'a-la-carte': {
    dir: 'images/A_LA_CARTE/',
    files: [
      'IMG_6223.JPEG', 'IMG_6222.JPG', 'IMG_6227.JPG', 'IMG_6225.JPG',
      'IMG_6228.JPEG', 'IMG_6226.JPG', 'IMG_6229.JPEG',
    ],
  },
};

// Interleave categories so the "All" view mixes them instead of grouping
const photoLists = Object.entries(CATEGORIES).map(([cat, { dir, files }]) =>
  files.map((file) => ({
    full: dir + file,
    thumb: dir + 'thumbs/' + file,
    cat,
  }))
);
const PHOTOS = [];
for (let i = 0; photoLists.some((list) => i < list.length); i++) {
  photoLists.forEach((list) => {
    if (i < list.length) PHOTOS.push(list[i]);
  });
}

const masonry = document.getElementById('masonry');
const filterBar = document.getElementById('portfolioFilter');
let visiblePhotos = [];

function renderPortfolio(filter) {
  visiblePhotos = PHOTOS.filter((p) => filter === 'all' || p.cat === filter);
  masonry.innerHTML = '';
  visiblePhotos.forEach((photo, i) => {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.setAttribute('aria-label', 'Open photo ' + (i + 1) + ' in full screen');
    const img = document.createElement('img');
    img.src = photo.thumb;
    img.alt = 'Bloombar Weddings — wedding floral design';
    img.loading = 'lazy';
    tile.appendChild(img);
    tile.addEventListener('click', () => openLightbox(i));
    masonry.appendChild(tile);
  });
}

if (filterBar) {
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });
    renderPortfolio(btn.dataset.filter);
  });
  renderPortfolio('all');
}

// ============ Lightbox ============
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  lbImg.src = visiblePhotos[lbIndex].full;
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.classList.remove('no-scroll');
}

function stepLightbox(dir) {
  lbIndex = (lbIndex + dir + visiblePhotos.length) % visiblePhotos.length;
  lbImg.src = visiblePhotos[lbIndex].full;
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => stepLightbox(-1));
document.getElementById('lbNext').addEventListener('click', () => stepLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

// Swipe navigation on touch devices
let touchX = null;
lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) stepLightbox(dx > 0 ? -1 : 1);
  touchX = null;
}, { passive: true });

// ============ Reveal on scroll ============
const revealTargets = document.querySelectorAll(
  '.section-head, .about-media, .about-body, .check-grid li, .floral-col, .steps li, .why-list li, .alacarte-media, .alacarte-body, .travel-item, .story-body p, .story-quote, .contact h2, .inquiry'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealTargets.forEach((el) => observer.observe(el));
