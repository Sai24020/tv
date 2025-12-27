// TODO: Definiera Vue-data för TV-program
// programs = [
//   { name: 'En perfekt skridskoälv', start: '2021-02-10T17:00:00+01:00', description: '...' },
//   ...
// ]

// TODO: renderSchedule() -> visa kommande program med v-for i Vue
// TODO: toggleMenu() -> ändra hamburger till kryss och visa/dölj sidomeny
// TODO: showPrevious() -> visa tidigare program när knapp klickas

//--------LÅT STÅ----------- 
  // Definiera fasta "konstanter" för olika typer av animering av menyn
  const ANIMATION = { 
    NONE: 'none',           // Ingen animation
    TIMER: 'timer',         // setInterval-baserad animation
    ALTERNATIVE: 'alternative' // ytterligare alternativ
  };

// Ändra värdet för att styra vilken meny-animation som ska användas
window.MENU_ANIMATION_MODE ??= ANIMATION.NONE; // ANIMATION.TIMER (Default) = ingen animation (G-nivå), ANIMATION.TIMER // (VG-nivå), ANIMATION.ALTERNATIVE // ytterligare ett alternativ (VG-nivå);

/*
 Användningsexempel för animationer beroende på inställning
*/
if (window.MENU_ANIMATION_MODE === ANIMATION.NONE) {
  console.log("Ingen meny-animation används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
  console.log("Meny-animation med timer används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
  console.log("Meny-animation med alternativ metod används");
}
//--------------------------
function renderSchedule(programs) {
  // Sortera programmen efter starttid
  programs.sort((a, b) => new Date(a.start) - new Date(b.start));

  const now = new Date();

  // Separera kommande program och tidigare program
  const upcoming = programs.filter(p => new Date(p.start) >= now);
  const past = programs.filter(p => new Date(p.start) < now);

  const ul = document.createElement("ul");
  ul.className = "list-group list-group-flush";

  // Lägg till knapp för att visa tidigare program om det finns sådana
  if (past.length > 0) {
    const liButton = document.createElement("li");
    liButton.className = "list-group-item show-previous";
    liButton.textContent = "Visa tidigare program";
    liButton.onclick = () => renderFullSchedule(programs);
    ul.appendChild(liButton);
  }

  // Rendera kommande program
  upcoming.forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${formatTime(p.start)}</strong><div>${p.name}</div><div>${p.description}</div>`;
    ul.appendChild(li);
  });

  scheduleContainer.innerHTML = "";
  scheduleContainer.appendChild(ul);
}

// Hjälpfunktion för att visa fullständig lista (inklusive tidigare program)
function renderFullSchedule(programs) {
  const ul = document.createElement("ul");
  ul.className = "list-group list-group-flush";

  programs.sort((a, b) => new Date(a.start) - new Date(b.start));

  programs.forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${formatTime(p.start)}</strong><div>${p.name}</div><div>${p.description}</div>`;
    ul.appendChild(li);
  });

  scheduleContainer.innerHTML = "";
  scheduleContainer.appendChild(ul);
}

// Format för tid (HH:MM)
function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

const scheduleContainer = document.getElementById("js-schedule");
// OBS: Filen i `data/` använder stor bokstav i "Kunskapskanalen.json"
fetch("data/Kunskapskanalen.json")
  .then(res => res.json())
  .then(data => {
    renderSchedule(data);
  })
  .catch(err => console.error("Fel vid laddning av JSON:", err));


// fn
function toggleMenu() {
  const menu = document.querySelector("ul.menu");
  const menuIcon = document.querySelector(".menu-icon i");

  if (menu.classList.contains("menu--show")) {
    menu.classList.remove("menu--show");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  } else {
    menu.classList.add("menu--show");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  }

  // Animationer
  if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
    animateMenuTimer();
  } else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
    animateMenuAlternative();
  }
}
// -----------------------------
// Funktion för att byta kanal och ladda JSON
// -----------------------------
function setChannel(channelName) {
  // Skriv kanalnamn i H1
  const title = document.getElementById("js-title");
  title.textContent = channelName;

  // Visa laddningsbild
  const loading = document.getElementById("js-loading");
  loading.classList.remove("hidden");

  // Bygg sökväg till JSON baserat på kanalnamn
  const filePath = `data/${channelName}.json`;

  // Hämta JSON och rendera tablå
  fetch(filePath)
    .then(res => res.json())
    .then(data => {
      // Dölj laddningsbild
      loading.classList.add("hidden");

      // Rendera kommande program
      renderSchedule(data);
    })
    .catch(err => {
      loading.classList.add("hidden");
      console.error("Fel vid laddning av JSON:", err);
      scheduleContainer.innerHTML = "<p>Kan inte ladda tablå</p>";
    });
}

