
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

// Smooth scroll pro menu
document.querySelectorAll('.dropdown a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // zabrání defaultnímu chování
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// funkce pro kontrolu, zda je element ve viewportu
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

const introImage = document.querySelector('.intro-image');
const introText = document.querySelector('.intro-text');

function showIntro() {
  const section = document.querySelector('.hero-intro');
  const rect = section.getBoundingClientRect();

  // když sekce dosáhne vrcholu obrazovky
  if(rect.top < window.innerHeight * 0.5 && rect.bottom > 0){
    introImage.classList.add('show');

    // text se zobrazí po 1s
    setTimeout(() => {
      introText.classList.add('show');
    }, 3000);

    window.removeEventListener('scroll', showIntro);
  }
}
// otevření sekce po kliknutí na menu
document.querySelectorAll('.dropdown a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // např. "homepage"
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    // 1️⃣ schovej všechny kategorie
    document.querySelectorAll('.category-section').forEach(sec => {
      sec.classList.remove('show');
      sec.classList.add('hidden');
    });

    // 2️⃣ ukaž cílovou sekci
    targetSection.classList.remove('hidden');
    targetSection.classList.add('show');

    // 3️⃣ smooth scroll na začátek sekce
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // 4️⃣ volitelně: fade-in obrázek a text v intro
    const introImage = targetSection.querySelector('.intro-image');
    const introText = targetSection.querySelector('.intro-text');

    if (introImage) {
      introImage.classList.add('show');
    }
    if (introText) {
      setTimeout(() => introText.classList.add('show'), 1000);
    }
  });
});
// Smooth scroll pro menu a aktivní sekce
let activeSection = null;
let lastScrollY = window.scrollY;
const heroSection = document.querySelector('.hero');

document.querySelectorAll('.dropdown a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      activeSection = targetSection;
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll kontrola pro automatické přesuny
window.addEventListener('scroll', () => {
  if (!activeSection) return;

  const currentScrollY = window.scrollY;
  const scrollingUp = currentScrollY < lastScrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  const activeRect = activeSection.getBoundingClientRect();
  const heroRect = heroSection.getBoundingClientRect();
  const threshold = 20; // jemný práh

  // Scroll nahoru – pokud projdeš nad aktivní sekci, vrať se k logu+mottu
  if (scrollingUp && activeRect.top > threshold) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll dolů – pokud projdeš pod spodní hranici hero sekce
  // ALE jen pokud nejsi úplně dole (ikonky/social)
  const bottomOffset = 50; // vzdálenost od konce stránky
  if (scrollingDown && heroRect.bottom < window.innerHeight - threshold &&
      window.scrollY + window.innerHeight < document.body.scrollHeight - bottomOffset) {
    activeSection.scrollIntoView({ behavior: 'smooth' });
  }
});


