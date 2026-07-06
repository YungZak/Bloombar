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
  installations: {
    dir: 'images/FLORAL_INSTALLATION/',
    files: [
      'IMG_3932.JPG', 'IMG_5051.JPG', 'IMG_6230.JPEG', 'IMG_5856.JPEG',
      'IMG_3933.JPG', 'IMG_5064.JPG', 'IMG_6231.JPEG', 'IMG_5108.JPG',
      'IMG_3936.JPG', 'IMG_5077.JPG', 'IMG_6232.JPEG', 'IMG_5857.JPEG',
      'IMG_3952.JPG', 'IMG_5296.JPG', 'IMG_6233.JPEG', 'IMG_5054.JPG',
      'IMG_6234.JPEG',
    ],
  },
  'bud-vases': {
    dir: 'images/Bud_vases_Ikebana/',
    files: [
      'IMG_5762.JPG', 'IMG_6143.JPEG', 'IMG_6145.JPEG', 'IMG_6235.JPEG',
      'IMG_6236.JPEG', 'IMG_6254.JPG', 'IMG_6255.JPG', 'IMG_6256.JPG',
      'IMG_6257.JPG', 'IMG_6261.JPG', 'IMG_6262.JPG', 'IMG_6263.JPG',
    ],
  },
  'candle-decor': {
    dir: 'images/Candle_Decor/',
    files: [
      'IMG_5691.JPEG', 'IMG_6251.JPG', 'IMG_6252.JPG', 'IMG_6253.JPG',
      'IMG_6258.JPG', 'IMG_6260.JPG',
    ],
  },
};

// Pixel size of every thumbnail, so the browser reserves the exact space
// before images load and the grid never jumps. Optional per photo: a missing
// entry just means that tile sizes itself after its image loads.
// Regenerate a line with: sips -g pixelWidth -g pixelHeight <thumb>
const THUMB_SIZES = {
  'images/Full_service_wedding/thumbs/IMG_2843.JPG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_2848.JPG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_2874.JPG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_2877.JPG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5688.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5690.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5698.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5703.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5704.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5705.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5709.JPEG': [640, 852],
  'images/Full_service_wedding/thumbs/IMG_5710.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5712.JPEG': [640, 853],
  'images/Full_service_wedding/thumbs/IMG_5713.JPEG': [640, 800],
  'images/Full_service_wedding/thumbs/IMG_5739.JPG': [640, 959],
  'images/Full_service_wedding/thumbs/IMG_5740.JPG': [640, 961],
  'images/Full_service_wedding/thumbs/IMG_5741.JPG': [640, 959],
  'images/Full_service_wedding/thumbs/IMG_5744.JPG': [640, 961],
  'images/Full_service_wedding/thumbs/IMG_5745.JPG': [640, 959],
  'images/Full_service_wedding/thumbs/IMG_5746.JPG': [640, 961],
  'images/A_LA_CARTE/thumbs/IMG_6222.JPG': [640, 853],
  'images/A_LA_CARTE/thumbs/IMG_6223.JPEG': [640, 853],
  'images/A_LA_CARTE/thumbs/IMG_6225.JPG': [640, 870],
  'images/A_LA_CARTE/thumbs/IMG_6226.JPG': [640, 853],
  'images/A_LA_CARTE/thumbs/IMG_6227.JPG': [640, 959],
  'images/A_LA_CARTE/thumbs/IMG_6228.JPEG': [640, 853],
  'images/A_LA_CARTE/thumbs/IMG_6229.JPEG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_3932.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_3933.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_3936.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_3952.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5051.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5054.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5064.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5077.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5108.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5296.JPG': [640, 853],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5856.JPEG': [640, 799],
  'images/FLORAL_INSTALLATION/thumbs/IMG_5857.JPEG': [640, 799],
  'images/FLORAL_INSTALLATION/thumbs/IMG_6230.JPEG': [640, 800],
  'images/FLORAL_INSTALLATION/thumbs/IMG_6231.JPEG': [640, 800],
  'images/FLORAL_INSTALLATION/thumbs/IMG_6232.JPEG': [640, 828],
  'images/FLORAL_INSTALLATION/thumbs/IMG_6233.JPEG': [640, 828],
  'images/FLORAL_INSTALLATION/thumbs/IMG_6234.JPEG': [640, 829],
  'images/Bud_vases_Ikebana/thumbs/IMG_5762.JPG': [640, 959],
  'images/Bud_vases_Ikebana/thumbs/IMG_6143.JPEG': [640, 853],
  'images/Bud_vases_Ikebana/thumbs/IMG_6145.JPEG': [640, 853],
  'images/Bud_vases_Ikebana/thumbs/IMG_6235.JPEG': [640, 853],
  'images/Bud_vases_Ikebana/thumbs/IMG_6236.JPEG': [640, 853],
  'images/Bud_vases_Ikebana/thumbs/IMG_6254.JPG': [640, 960],
  'images/Bud_vases_Ikebana/thumbs/IMG_6255.JPG': [640, 800],
  'images/Bud_vases_Ikebana/thumbs/IMG_6256.JPG': [640, 960],
  'images/Bud_vases_Ikebana/thumbs/IMG_6257.JPG': [640, 849],
  'images/Bud_vases_Ikebana/thumbs/IMG_6261.JPG': [640, 799],
  'images/Bud_vases_Ikebana/thumbs/IMG_6262.JPG': [640, 959],
  'images/Bud_vases_Ikebana/thumbs/IMG_6263.JPG': [640, 960],
  'images/Candle_Decor/thumbs/IMG_5691.JPEG': [640, 853],
  'images/Candle_Decor/thumbs/IMG_6251.JPG': [640, 960],
  'images/Candle_Decor/thumbs/IMG_6252.JPG': [640, 959],
  'images/Candle_Decor/thumbs/IMG_6253.JPG': [640, 767],
  'images/Candle_Decor/thumbs/IMG_6258.JPG': [640, 717],
  'images/Candle_Decor/thumbs/IMG_6260.JPG': [640, 960],
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
const loadMoreBtn = document.getElementById('loadMore');
const PAGE_SIZE = 12; // 4 rows of 3 on desktop, 6 rows of 2 on mobile
const mobileLayout = window.matchMedia('(max-width: 820px)');
let visiblePhotos = [];
let shownCount = 0;
// The grid is built from real column elements (not CSS columns) so that
// "Load More" only appends tiles — photos already on screen never move.
let columns = [];
let colHeights = [];

function setupColumns() {
  masonry.innerHTML = '';
  columns = [];
  colHeights = [];
  const count = mobileLayout.matches ? 2 : 3;
  for (let c = 0; c < count; c++) {
    const col = document.createElement('div');
    col.className = 'masonry-col';
    masonry.appendChild(col);
    columns.push(col);
    colHeights.push(0);
  }
}

function appendTiles(count) {
  visiblePhotos.slice(shownCount, shownCount + count).forEach((photo, j) => {
    const i = shownCount + j;
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.setAttribute('aria-label', 'Open photo ' + (i + 1) + ' in full screen');
    const img = document.createElement('img');
    const size = THUMB_SIZES[photo.thumb];
    if (size) {
      img.width = size[0];
      img.height = size[1];
    }
    img.src = photo.thumb;
    img.alt = 'Bloombar Weddings — wedding floral design';
    img.loading = 'lazy';
    // Fade the photo in over the placeholder tile once it has loaded
    if (img.complete) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    }
    tile.appendChild(img);
    tile.addEventListener('click', () => openLightbox(i));
    // drop the tile into the currently shortest column
    const c = colHeights.indexOf(Math.min(...colHeights));
    columns[c].appendChild(tile);
    colHeights[c] += size ? size[1] / size[0] : 4 / 3;
  });
  shownCount = Math.min(shownCount + count, visiblePhotos.length);
  if (loadMoreBtn) loadMoreBtn.hidden = shownCount >= visiblePhotos.length;
}

function renderPortfolio(filter) {
  visiblePhotos = PHOTOS.filter((p) => filter === 'all' || p.cat === filter);
  shownCount = 0;
  setupColumns();
  appendTiles(PAGE_SIZE);
}

if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => appendTiles(PAGE_SIZE));

// Rebuild the columns when crossing the 2 ⇄ 3 column breakpoint,
// keeping however many photos were already shown
mobileLayout.addEventListener('change', () => {
  const keep = shownCount;
  shownCount = 0;
  setupColumns();
  appendTiles(keep);
});

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
