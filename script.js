document.addEventListener("DOMContentLoaded", function () {
  // Venter på at hele HTML-siden er indlæst, før koden køres.
  // Dette forhindrer fejl, hvis JavaScript prøver at finde elementer
  // der ikke er oprettet endnu.

  // ================================
  // POPUP
  // ================================
  // Finder popup-elementerne i HTML via deres ID
  const overlay = document.getElementById("popup-overlay");
  const lukKnap = document.getElementById("luk-knap");

  // Tjekker at begge elementer findes (bruges ikke på alle sider)
  if (overlay && lukKnap) {
    // Viser popup'en efter 1 sekund (1000 millisekunder)
    setTimeout(function () {
      overlay.style.display = "flex";
    }, 1000);

    // Lytter efter klik på X-knappen og skjuler popup'en
    lukKnap.addEventListener("click", function () {
      overlay.style.display = "none";
    });

    // Lytter efter klik på det mørke lag bagved popup'en.
    // e.target er det element man klikkede på.
    // Hvis man klikkede direkte på overlay (og ikke på selve popup'en),
    // lukkes popup'en.
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });
  }

  // ================================
  // HAMBURGER MENU
  // ================================
  // Finder hamburger-knappen og navigationsmenuen via deres ID
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Tjekker at begge elementer findes (bruges ikke på alle sider)
  if (hamburger && navMenu) {
    // Lytter efter klik på hamburger-knappen.
    // toggle() tilføjer klassen hvis den ikke er der, og fjerner den hvis den er.
    // 'aktiv' animerer de tre streger til et kryds (via CSS).
    // 'åben' viser navigationsmenuen (via CSS).
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("aktiv");
      navMenu.classList.toggle("åben");
    });
  }

  // ================================
  // VÆLG KNAPPER (per gruppe)
  // ================================
  // Finder alle knapper med klassen 'knapvælg' på siden
  document.querySelectorAll(".knapvælg").forEach((knap) => {
    // Tilføjer en klik-lytter til hver knap
    knap.addEventListener("click", () => {
      // Finder den nærmeste overordnede '.produkt-gruppe' container.
      // closest() søger opad i HTML-strukturen efter det angivne element.
      const gruppe = knap.closest(".produkt-gruppe");

      // Fjerner 'valgt'-klassen fra alle knapper inden for samme gruppe.
      // Dette sikrer at kun én knap kan være valgt ad gangen per gruppe.
      gruppe
        .querySelectorAll(".knapvælg")
        .forEach((k) => k.classList.remove("valgt"));

      // Tilføjer 'valgt'-klassen til den knap man klikkede på.
      // CSS bruger .knapvælg.valgt til at give den orange farve.
      knap.classList.add("valgt");
    });
  });

  // ================================
  // SLIDESHOW
  // ================================
  // Finder alle slideshow-containere på siden
  document.querySelectorAll(".slideshow").forEach(function (slideshow) {
    // Finder alle billeder med klassen 'slide' inden for dette slideshow
    const slides = slideshow.querySelectorAll(".slide");

    // Holder styr på hvilket billede der vises (starter ved 0 = første billede)
    let index = 0;

    // Lytter efter klik på næste-pilen (›)
    slideshow.querySelector(".next").addEventListener("click", function () {
      slides[index].classList.remove("aktiv"); // Skjuler det nuværende billede
      index = (index + 1) % slides.length; // Går til næste billede (starter forfra når man når slutningen)
      slides[index].classList.add("aktiv"); // Viser det nye billede
    });

    // Lytter efter klik på forrige-pilen (‹)
    slideshow.querySelector(".prev").addEventListener("click", function () {
      slides[index].classList.remove("aktiv"); // Skjuler det nuværende billede
      index = (index - 1 + slides.length) % slides.length; // Går til forrige billede (hopper til slutningen hvis man er ved starten)
      slides[index].classList.add("aktiv"); // Viser det nye billede
    });
  });
});

document.querySelectorAll(".accordion-knap").forEach((knap) => {
  knap.addEventListener("click", () => {
    const indhold = knap.nextElementSibling;
    knap.classList.toggle("åben");
    indhold.classList.toggle("åben");
  });
});
