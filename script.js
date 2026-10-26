

/* ========================================
   PERSONALIZE YOUR BIRTHDAY WEBSITE HERE
======================================== */

const CONFIG = {
  name: "Anjli", // यहाँ उनका नाम लिखें
  year: new Date().getFullYear()
};

/* ========================================
   WEBSITE INITIALIZATION
======================================== */

const $ = (selector) => document.querySelector(selector);

$("#heroName").textContent = CONFIG.name;
$("#popupName").textContent = CONFIG.name;
$("#year").textContent = CONFIG.year;

document.title = `Happy Birthday, ${CONFIG.name} ❤️`;

const overlay = $("#surpriseOverlay");
const surpriseBtn = $("#surpriseBtn");
const closeBtn = $("#closeSurprise");
const celebrateBtn = $("#celebrateBtn");
const wishBtn = $("#wishBtn");
const wishResult = $("#wishResult");
const toast = $("#toast");

let lastFocusedElement = null;
let toastTimeout;
let toastTimer = null;

/* ========================================
   GOLDEN STARS
======================================== */

const starsContainer = $("#stars");
const starCount = window.innerWidth < 600 ? 35 : 75;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("span");
  star.className = "star";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty(
    "--duration",
    `${2 + Math.random() * 4}s`
  );
  star.style.animationDelay = `${Math.random() * 4}s`;

  starsContainer.appendChild(star);
}

/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* ========================================
   TOAST MESSAGE
======================================== */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* ========================================
   BIRTHDAY SURPRISE POPUP
======================================== */

function openSurprise() {
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
  launchConfetti(100);
}

function closeSurprise() {
  overlay.hidden = true;
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

surpriseBtn.addEventListener("click", openSurprise);
closeBtn.addEventListener("click", closeSurprise);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeSurprise();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) {
    closeSurprise();
  }
});

/* ========================================
   CONFETTI ANIMATION
   Uses Canvas and vanilla JavaScript
======================================== */

const canvas = $("#confettiCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame = null;
let canvasWidth = 0;
let canvasHeight = 0;

const colors = ["#d6b56d", "#ffe8ad", "#ffffff", "#b88c3e", "#f4d68b"];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti(amount = 140) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvasWidth,
      y: -20 - Math.random() * canvasHeight * 0.5,
      size: 3 + Math.random() * 5,
      speedY: 2 + Math.random() * 4,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "rect" : "circle"
    });
  }

  if (animationFrame === null) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
    }

    ctx.restore();
  });

  particles = particles.filter(
    (p) => p.y < canvasHeight + 30 && p.x > -30 && p.x < canvasWidth + 30
  );

  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    animationFrame = null;
  }
}

/* ========================================
   LET'S CELEBRATE BUTTON
======================================== */

celebrateBtn.addEventListener("click", () => {
  launchConfetti(220);
  closeSurprise();
  showToast(`Happy Birthday, ${CONFIG.Anjali}! ❤️`);

  $("#wish").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });
});

/* ========================================
   PERSONAL BIRTHDAY WISH
======================================== */

const wishes = [
  "तुम्हारी जिंदगी हमेशा खुशियों से रोशन रहे। जन्मदिन की ढेर सारी शुभकामनाएँ! ❤️",
  "तुम्हारी हर दुआ पूरी हो और तुम्हारी मुस्कान हमेशा बनी रहे। Happy Birthday! ✨",
  "तुम्हारे आने वाला हर साल पहले से ज्यादा खूबसूरत हो। ढेर सारा प्यार! 💛"
];

wishBtn.addEventListener("click", () => {
  const wish = wishes[Math.floor(Math.random() * wishes.length)];

  wishResult.textContent = wish;
  launchConfetti(80);
});

/* ========================================
   OPTIONAL: PERSONALIZE VIA CONFIG
======================================== */

// CONFIG.name में नाम बदलने से Hero और Popup का नाम
// अपने आप बदल जाएगा। बाकी मैसेज index.html में एडिट करें।

console.log("Birthday Surprise Website is ready! ❤️");
