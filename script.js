// ---------- Konfigurasi PIN ----------
const correctPin = "000000"; // Ganti dengan PIN rahasia kalian, 6 digit
const pinLength = correctPin.length;

let enteredPin = "";

const pinScreen = document.getElementById('pinScreen');
const mainSite = document.getElementById('mainSite');
const pinDots = document.querySelectorAll('#pinDots .dot');
const pinError = document.getElementById('pinError');
const keypad = document.getElementById('keypad');
const clearBtn = document.getElementById('clearBtn');
const backBtn = document.getElementById('backBtn');
const bgm = document.getElementById('bgm');
const soundToggle = document.getElementById('soundToggle');

function updateDots(){
  pinDots.forEach((dot, i)=>{
    dot.classList.toggle('filled', i < enteredPin.length);
  });
}

function showError(){
  pinError.classList.add('show');
  setTimeout(()=> pinError.classList.remove('show'), 500);
}

function checkPin(){
  if(enteredPin === correctPin){
    unlock();
  } else {
    showError();

    setTimeout(()=>{
      enteredPin = "";
      updateDots();
    }, 400);
  }
}

function unlock(){
  pinScreen.classList.add('unlocked');
  mainSite.classList.add('show');

  bgm.play().catch(()=>{
    // kalau browser block autoplay,
    // user bisa menyalakan suara manual
    soundToggle.textContent = '🔇';
  });
}

keypad.addEventListener('click', (e)=>{
  const btn = e.target.closest('.key');
  if(!btn) return;

  if(btn.id === 'clearBtn'){
    enteredPin = "";
    updateDots();
    return;
  }

  if(btn.id === 'backBtn'){
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
    return;
  }

  if(btn.dataset.num !== undefined && enteredPin.length < pinLength){
    enteredPin += btn.dataset.num;
    updateDots();

    if(enteredPin.length === pinLength){
      setTimeout(checkPin, 150);
    }
  }
});

// Dukungan keyboard fisik juga
document.addEventListener('keydown', (e)=>{
  if(pinScreen.classList.contains('unlocked')) return;

  if(e.key >= '0' && e.key <= '9' && enteredPin.length < pinLength){
    enteredPin += e.key;
    updateDots();

    if(enteredPin.length === pinLength){
      setTimeout(checkPin, 150);
    }

  } else if(e.key === 'Backspace'){
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
  }
});


// ---------- Halaman 2: Kue & Lilin ----------
const candleCount = 5; // GANTI sesuai jumlah lilin yang kamu mau
const candlesContainer = document.getElementById('candles');
const cakeMessage = document.getElementById('cakeMessage');

let blownCount = 0;

function buildCandles(){
  for(let i = 0; i < candleCount; i++){

    const candle = document.createElement('div');
    candle.className = 'candle';

    candle.innerHTML = `
      <div class="flame"></div>
      <div class="wick"></div>
      <div class="stick"></div>
    `;

    candle.addEventListener('click', () => blowCandle(candle));

    candlesContainer.appendChild(candle);
  }
}

function blowCandle(candle){
  if(candle.classList.contains('blown')) return;

  candle.classList.add('blown');
  spawnSmoke(candle);

  blownCount++;

  if(blownCount === candleCount){
    setTimeout(() => {
      cakeMessage.classList.add('show');
      burstConfetti();
    }, 500);
  }
}

function spawnSmoke(candle){
  const smoke = document.createElement('div');
  smoke.className = 'smoke';

  candle.appendChild(smoke);

  setTimeout(() => smoke.remove(), 900);
}

function burstConfetti(){
  const colors = [
    '#6E1423',
    '#C9A15A',
    '#F8EFE0',
    '#8C2A3A'
  ];

  for(let i = 0; i < 40; i++){

    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      (2 + Math.random() * 1.5) + 's';

    piece.style.animationDelay =
      (Math.random() * 0.3) + 's';

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 3500);
  }
}

soundToggle.addEventListener('click', () => {

  if(bgm.paused){
    bgm.play();
    soundToggle.textContent = '🔊';

  } else {
    bgm.pause();
    soundToggle.textContent = '🔇';
  }

});

buildCandles();


// ---------- Halaman 2 -> 3: Tombol Lanjut ----------
const cakePage = document.getElementById('cakePage');
const envelopePage = document.getElementById('envelopePage');
const toEnvelopeBtn = document.getElementById('toEnvelopeBtn');

toEnvelopeBtn.addEventListener('click', () => {

  cakePage.classList.add('exit');
  envelopePage.classList.add('active');

});


// ---------- Halaman 3: Amplop Interaktif ----------
const envelope = document.getElementById('envelope');
const envHint = document.getElementById('envHint');
const letterModal = document.getElementById('letterModal');
const letterClose = document.getElementById('letterClose');

let envelopeOpened = false;
let letterHasBeenRead = false;

const toNextPageBtn = document.getElementById('toNextPageBtn');

envelope.addEventListener('click', () => {

  if(envelopeOpened) return;

  envelopeOpened = true;

  envelope.classList.add('opened');
  envHint.style.opacity = '0';

  setTimeout(() => {
    letterModal.classList.add('show');
  }, 650);

});


// Tutup modal surat -> amplop ikut tertutup lagi
function closeLetterModal(){

  letterModal.classList.remove('show');

  setTimeout(() => {

    envelope.classList.remove('opened');

    envelopeOpened = false;

    envHint.style.opacity = '1';

    // Setelah surat dibaca,
    // tombol lanjut diaktifkan
    if(!letterHasBeenRead){

      letterHasBeenRead = true;

      toNextPageBtn.classList.add('ready');

    }

  }, 350);
}

letterClose.addEventListener('click', closeLetterModal);

letterModal.addEventListener('click', (e) => {

  if(e.target === letterModal){
    closeLetterModal();
  }

});


/* =========================================================
   HALAMAN 4: MEMORY
   ========================================================= */

const memoryPage = document.getElementById('memoryPage');
const memIntro = document.getElementById('memIntro');
const memDump = document.getElementById('memDump');
const memFeaturedPhoto = document.getElementById('memFeaturedPhoto');

const memDumpScroll = document.querySelector('.mem-dump-scroll');
const memClosing = document.querySelector('.mem-closing');

let memoryDumpOpened = false;
let memoryClosingShown = false;


memFeaturedPhoto.addEventListener('click', () => {

  if(memoryDumpOpened) return;

  memoryDumpOpened = true;
  memoryClosingShown = false;

  /* Pastikan closing selalu tersembunyi saat Photo Dump dibuka */
  if(memClosing){
    memClosing.classList.remove('show');
  }

  /* Mulai dari foto pertama */
  if(memDumpScroll){
    memDumpScroll.scrollTop = 0;
  }

  memIntro.classList.add('hide');

  memDump.style.display = 'flex';

  requestAnimationFrame(() => {
    memDump.classList.add('show');
  });

});


/* =========================================================
   PHOTO DUMP - SCROLL
   =========================================================

   Scrollbar disembunyikan dari CSS.
   JavaScript hanya mendeteksi kapan user sudah sampai
   di bagian paling bawah photo dump.
   ========================================================= */

function checkMemoryScrollBottom(){

  if(!memDumpScroll || !memClosing) return;

  const maxScroll =
    memDumpScroll.scrollHeight -
    memDumpScroll.clientHeight;

  /* Tidak ada overflow berarti belum perlu menunggu scroll */
  if(maxScroll <= 0){
    return;
  }

  const reachedBottom =
    memDumpScroll.scrollTop >= maxScroll - 8;

  if(reachedBottom && !memoryClosingShown){

    memoryClosingShown = true;

    memClosing.classList.add('show');

  }
}


if(memDumpScroll){

  memDumpScroll.addEventListener(
    'scroll',
    checkMemoryScrollBottom,
    { passive:true }
  );

  /* Browser modern mendukung scrollend; fallback scroll di atas
     tetap menangani browser yang belum mendukungnya. */
  if('onscrollend' in window){
    memDumpScroll.addEventListener(
      'scrollend',
      checkMemoryScrollBottom,
      { passive:true }
    );
  }
}



/* =========================================================
   PHOTO DUMP
   =========================================================

   FOTO SEKARANG TIDAK LAGI DIBUAT OTOMATIS OLEH JAVASCRIPT.

   Semua foto ditulis langsung di HTML:

   <div class="dump-item">
      <img src="img/kenangan1.jpg" alt="">
   </div>

   Jadi kalau mau menambah foto,
   cukup tambahkan HTML di bagian memDumpGrid.

   CSS mengatur semua foto agar menjadi polaroid
   dengan ukuran yang sama.
*/


// Tidak ada lagi:
// DUMP_PHOTO_CONFIG
// probeImage()
// buildDumpGrid()
// buildDumpGrid();


// ---------- Tombol dari Halaman Memory -> Halaman Final ----------
toNextPageBtn.addEventListener('click', () => {

  if(!letterHasBeenRead) return;

  envelopePage.classList.add('exit');
  memoryPage.classList.add('active');

});


// =========================================================
// HALAMAN 5: KADO TERAKHIR
// =========================================================

// Porting dari script pygame:
// partikel tulisan "i love you" membentuk hati,
// muncul dari garis luar lalu isi dalamnya,
// ditutup teks besar di tengah.

const finalPage = document.getElementById('finalPage');
const finalRevealBg = document.getElementById('finalRevealBg');
const finalCanvas = document.getElementById('finalCanvas');
const fctx = finalCanvas.getContext('2d');
const finalText = document.getElementById('finalText');
const toFinalBtn = document.getElementById('toFinalBtn');
const giftBox = document.getElementById('giftBox');

let finalTriggered = false;
let loveParticles = [];


// ---------- Roll film foto di background halaman kado terakhir ----------

const ALL_PHOTOS = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'img/11.jpg',
  'img/12.jpg',

  'img/first-time.jpg',

  'img/kenangan1.jpg',
  'img/kenangan2.jpg',
  'img/kenangan3.jpg',
  'img/kenangan4.jpg',
  'img/kenangan6.jpg',
  'img/kenangan7.jpg',
  'img/kenangan8.jpg',
  'img/kenangan9.jpg',
  'img/kenangan10.jpg',
  'img/kenangan11.jpeg',
  'img/kenangan12.jpg',
  'img/kenangan14.jpg',
  'img/kenangan16.jpg',
  'img/kenangan17.jpeg',
  'img/kenangan18.jpeg',
  'img/kenangan19.jpg',
  'img/kenangan20.jpg',
  'img/kenangan21.jpg',
  'img/kenangan22.jpg',
  'img/kenangan23.jpg',
  'img/kenangan24.jpg',
  'img/kenangan25.jpg',
  'img/kenangan26.jpg',
  'img/kenangan27.jpg',
  'img/kenangan28.JPG',
  'img/kenangan29.JPG',
];


function shuffleArray(arr){

  const a = arr.slice();

  for(let i = a.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];

  }

  return a;
}


function buildFilmstripRow(rowEl, photos){

  if(!photos.length) return;

  const MIN_ITEMS_PER_ROW = 26;

  let repeatCount =
    Math.ceil(MIN_ITEMS_PER_ROW / photos.length);

  if(repeatCount < 2) repeatCount = 2;

  if(repeatCount % 2 !== 0){
    repeatCount += 1;
  }

  const frag = document.createDocumentFragment();

  for(let r = 0; r < repeatCount; r++){

    photos.forEach(src => {

      const img = document.createElement('img');

      img.src = src;
      img.alt = '';
      img.loading = 'lazy';

      img.onerror = () => {
        img.style.display = 'none';
      };

      frag.appendChild(img);

    });

  }

  rowEl.appendChild(frag);
}


function initFilmstrip(){

  const rows =
    document.querySelectorAll(
      '#finalFilmstrip .filmstrip-row'
    );

  if(!rows.length || !ALL_PHOTOS.length) return;

  const shuffled = shuffleArray(ALL_PHOTOS);

  const perRow =
    Math.ceil(shuffled.length / rows.length);

  rows.forEach((rowEl, i) => {

    const slice =
      shuffled.slice(
        i * perRow,
        (i + 1) * perRow
      );

    if(slice.length){
      buildFilmstripRow(rowEl, slice);
    }

  });

}

initFilmstrip();


let loveFrame = 0;
let loveAnimId = null;
let loveFillStartFrame = 0;
let loveCenterStartFrame = 0;

const LOVE_WORDS = [
  'i love you',
  'I LOVE YOU',
  'love you'
];

const LOVE_COLORS = [
  '#ff4623',
  '#ff822d',
  '#ff2d2d',
  '#ffbe5a',
  '#ff5f3c'
];

const CENTER_TEXT = 'I Love You 3000';


// ---------- Kurva hati ----------
function heartXY(t){

  const x =
    16 * Math.pow(Math.sin(t), 3);

  const y =
    13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t);

  return [x, -y];
}


function resizeFinalCanvas(){

  const rect =
    finalPage.getBoundingClientRect();

  const dpr =
    window.devicePixelRatio || 1;

  finalCanvas.width =
    rect.width * dpr;

  finalCanvas.height =
    rect.height * dpr;

  finalCanvas.style.width =
    rect.width + 'px';

  finalCanvas.style.height =
    rect.height + 'px';

  fctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  finalCanvas._cssW = rect.width;
  finalCanvas._cssH = rect.height;

}


function makeParticle(x, y, order, kind){

  return {

    x,
    y,
    order,
    kind,

    word:
      LOVE_WORDS[
        Math.floor(
          Math.random() *
          LOVE_WORDS.length
        )
      ],

    color:
      LOVE_COLORS[
        Math.floor(
          Math.random() *
          LOVE_COLORS.length
        )
      ],

    alpha: 0,

    flicker:
      Math.random() *
      Math.PI * 2,

    delay: 0,

    sizeMult:
      0.85 +
      Math.random() * 0.3,

    fontSize:
      kind === 'outline'
        ? 13
        : 11

  };

}


function buildLoveParticles(){

  const W = finalCanvas._cssW;
  const H = finalCanvas._cssH;

  const scale =
    Math.min(W, H) * 0.021;

  const offsetY =
    H * 0.02;


  function toScreen(x, y){

    return [
      x * scale + W / 2,
      y * scale + H / 2 + offsetY
    ];

  }


  const particles = [];


  // Garis luar hati
  const nOutline = 95;

  const minGapOutline =
    Math.max(
      11,
      Math.min(W, H) * 0.019
    );

  const placedOutline = [];


  for(let i = 0; i < nOutline; i++){

    const t =
      (i / nOutline) *
      Math.PI * 2;

    const [bx, by] =
      heartXY(t);

    const [sx, sy] =
      toScreen(bx, by);

    let tooClose = false;


    for(const [px, py] of placedOutline){

      if(
        Math.hypot(
          sx - px,
          sy - py
        ) < minGapOutline
      ){

        tooClose = true;
        break;

      }

    }


    if(tooClose) continue;

    placedOutline.push([sx, sy]);

    particles.push(
      makeParticle(
        sx,
        sy,
        i,
        'outline'
      )
    );

  }


  // Isi dalam hati
  const nFill = 75;

  const minGapFill =
    Math.max(
      15,
      Math.min(W, H) * 0.025
    );

  const placedFill = [];

  let attempts = 0;

  const maxAttempts =
    nFill * 90;


  while(
    placedFill.length < nFill &&
    attempts < maxAttempts
  ){

    attempts++;

    const t =
      Math.random() *
      Math.PI * 2;

    const r =
      Math.random() * 0.86;

    const [bx, by] =
      heartXY(t);

    const [sx, sy] =
      toScreen(
        bx * r,
        by * r
      );

    let tooClose = false;


    for(const [qx, qy] of placedFill){

      if(
        Math.hypot(
          sx - qx,
          sy - qy
        ) < minGapFill
      ){

        tooClose = true;
        break;

      }

    }


    if(tooClose) continue;

    placedFill.push([sx, sy]);

    particles.push(
      makeParticle(
        sx,
        sy,
        Math.floor(
          Math.random() * 260
        ),
        'fill'
      )
    );

  }


  const outlineSpan =
    placedOutline.length
      ? nOutline
      : 0;

  const framesPerStep = 1.6;

  loveFillStartFrame =
    Math.floor(
      outlineSpan *
      framesPerStep
    ) + 25;


  particles.forEach(p => {

    p.delay =
      p.kind === 'outline'
        ? Math.floor(
            p.order *
            framesPerStep
          )
        : loveFillStartFrame +
          p.order;

  });


  loveCenterStartFrame =
    loveFillStartFrame + 150;


  return particles;

}


function drawGlowText(p, alpha){

  if(alpha <= 0) return;

  const size =
    p.fontSize *
    p.sizeMult;

  fctx.save();

  fctx.globalAlpha =
    alpha / 255;

  fctx.font =
    `700 ${size}px Quicksand, sans-serif`;

  fctx.textAlign = 'center';
  fctx.textBaseline = 'middle';


  if(alpha > 20){

    fctx.shadowColor = p.color;
    fctx.shadowBlur = 22;

    fctx.globalAlpha =
      (alpha / 255) * 0.55;

    fctx.fillStyle = p.color;

    fctx.fillText(
      p.word,
      p.x,
      p.y
    );

  }


  fctx.shadowBlur = 6;

  fctx.globalAlpha =
    alpha / 255;

  fctx.fillStyle = p.color;

  fctx.fillText(
    p.word,
    p.x,
    p.y
  );

  fctx.restore();

}


function loveAnimationStep(){

  loveFrame++;

  fctx.clearRect(
    0,
    0,
    finalCanvas._cssW,
    finalCanvas._cssH
  );


  let allSettled = true;


  for(const p of loveParticles){

    if(
      loveFrame > p.delay &&
      p.alpha < 255
    ){

      p.alpha =
        Math.min(
          255,
          p.alpha +
          14 +
          Math.random() * 4
        );

    }


    let flick = 1;


    if(p.alpha >= 255){

      flick =
        0.78 +
        0.22 *
        Math.sin(
          loveFrame * 0.04 +
          p.flicker
        );

    } else {

      allSettled = false;

    }


    drawGlowText(
      p,
      p.alpha * flick
    );

  }


  if(loveFrame > loveCenterStartFrame){

    const progress =
      Math.min(
        1,
        (
          loveFrame -
          loveCenterStartFrame
        ) / 60
      );

    const centerAlpha =
      1 -
      Math.exp(
        -progress * 8
      );

    const pulse =
      1 +
      0.03 *
      Math.sin(
        loveFrame * 0.05
      );

    const W =
      finalCanvas._cssW;

    const H =
      finalCanvas._cssH;


    fctx.save();

    fctx.globalAlpha =
      centerAlpha;

    fctx.translate(
      W / 2,
      H / 2
    );

    fctx.scale(
      pulse,
      pulse
    );

    fctx.font =
      `700 ${Math.min(W, H) * 0.075}px 'Playfair Display', serif`;

    fctx.textAlign = 'center';
    fctx.textBaseline = 'middle';

    fctx.shadowColor =
      '#ffd9a0';

    fctx.shadowBlur = 32;

    fctx.fillStyle =
      '#fffaf5';

    fctx.fillText(
      CENTER_TEXT,
      0,
      0
    );

    fctx.restore();


    if(
      progress >= 1 &&
      !finalText.classList.contains('show')
    ){

      finalText.classList.add('show');

    }

  }


  // Animasi terus berjalan
  loveAnimId =
    requestAnimationFrame(
      loveAnimationStep
    );

}


function startLoveHeartAnimation(){

  if(finalTriggered) return;

  finalTriggered = true;

  finalPage.classList.add('reveal');

  resizeFinalCanvas();

  loveParticles =
    buildLoveParticles();

  loveFrame = 0;


  if(loveAnimId){
    cancelAnimationFrame(
      loveAnimId
    );
  }

  loveAnimationStep();

}


window.addEventListener('resize', () => {

  if(finalTriggered){
    resizeFinalCanvas();
  }

});


giftBox.addEventListener('click', () => {

  if(
    giftBox.classList.contains('opened')
  ){
    return;
  }

  giftBox.classList.add('opened');

  setTimeout(() => {
    startLoveHeartAnimation();
  }, 450);

});


toFinalBtn.addEventListener('click', () => {

  memoryPage.classList.add('exit');

  finalPage.classList.add('active');

});