
// 🔊 Spuštění hudby po kliknutí / scrollu
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");

  const playAudio = () => {
    audio.play().catch(err => console.log("Autoplay blocked:", err));
    document.removeEventListener("click", playAudio);
    document.removeEventListener("scroll", playAudio);
  };

  document.addEventListener("click", playAudio);
  document.addEventListener("scroll", playAudio);
});

// 📜 Dropdown menu
const button = document.querySelector('.menu-button');
const dropdown = document.querySelector('.dropdown');



// kliknutí pro otevření dropdownu
button.addEventListener('click', () => {
  dropdown.classList.toggle('show');  // odkazy se fade-inují teprve při kliknutí
});

document.addEventListener("DOMContentLoaded", () => {
  const motto = document.querySelector(".motto");
  const menuContainer = document.querySelector(".menu-container");

  // ⏳ počkáme, až doběhne fade-in slov (7s nebo kolik máš nastavené)
  setTimeout(() => {
    // 1️⃣ přidáme pohyb motta nahoru
    motto.classList.add("move-up");

    // 2️⃣ po 1 vteřině od posunu motta zobrazíme menu
    setTimeout(() => {
      menuContainer.classList.add("show-menu");
    }, 2000);
 }, 7000); // tady nastav délku trvání animace textu (fadeIn slov)
});

// fade-in menu po 7 vteřinách (bez odkazů)
setTimeout(() => {
  const menuContainer = document.querySelector('.menu-container');
  menuContainer.classList.add('show-menu');
}, 20000);

// Když se menu zobrazí (class show-menu), počkáme až doběhne fade-in a pak přidáme move-up
const menuContainer = document.querySelector('.menu-container');

if (menuContainer) {
  menuContainer.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity' && menuContainer.classList.contains('show-menu')) {
      // počkáme ještě třeba 0.5s a pak přidáme pohyb nahoru
      setTimeout(() => {
        menuContainer.classList.add('move-up');
      }, 100);
    }
  });
}

// po fade-in menu + 2 vteřiny ztmavit okolí
setTimeout(() => {
  const heroLogo = document.querySelector(".hero-logo");
  const motto = document.querySelector(".motto");
const channels = document.querySelectorAll('.channel-card img');
  heroLogo.classList.add("dimmed");
  motto.classList.add("dimmed");
channels.forEach(img => img.classList.add("dimmed"));
}, 9000); 

// =========================
// Smooth scroll pro menu
// =========================
let activeSection = null;
let lastScrollY = window.scrollY;
const heroSection = document.querySelector('.hero');

// Klik na položku menu -> otevře správnou sekci
document.querySelectorAll('.dropdown a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // např. "homepage"
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    // schovej všechny kategorie
    document.querySelectorAll('.category-section').forEach(sec => {
      sec.classList.remove('show');
      sec.classList.add('hidden');
    });

    // ukaž jen tu kliknutou
    targetSection.classList.remove('hidden');
    targetSection.classList.add('show');

    // nastav jako aktivní
    activeSection = targetSection;

    // smooth scroll
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // volitelně animace v sekci (obrázek + text)
    const introImage = targetSection.querySelector('.intro-image');
    const introText = targetSection.querySelector('.intro-text');

    if (introImage) introImage.classList.add('show');
    if (introText) setTimeout(() => introText.classList.add('show'), 1000);
  });
});

let isAutoScrolling = false;

// =========================
// Auto-scroll logika
// =========================
window.addEventListener('scroll', () => {
  if (!activeSection || isAutoScrolling) return;

  const currentScrollY = window.scrollY;
  const scrollingUp = currentScrollY < lastScrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  const activeRect = activeSection.getBoundingClientRect();
  const heroRect = heroSection.getBoundingClientRect();
  const threshold = 30; // tolerance

  // 🔼 Scroll nahoru → pokud jsem nad aktivní kategorií
  if (scrollingUp && activeRect.top > threshold) {
    smoothScrollTo(heroSection);
  }

  // 🔽 Scroll dolů → jen pokud jsem na hero
  if (
    scrollingDown &&
    heroRect.bottom < window.innerHeight - threshold &&
    currentScrollY < heroSection.offsetHeight + 100
  ) {
    smoothScrollTo(activeSection);
  }
});

// Pomocná funkce s lockem
function smoothScrollTo(element) {
  isAutoScrolling = true;
  element.scrollIntoView({ behavior: 'smooth' });

  // odemkneme lock po 800ms (čas animace)
  setTimeout(() => {
    isAutoScrolling = false;
  }, 800);
}

