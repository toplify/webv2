
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



