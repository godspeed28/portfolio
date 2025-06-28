// api github

function animateProgress(circleSelector, textSelector, skillValue) {
  let circle = document.querySelector(circleSelector);
  let text = document.getElementById(textSelector);

  if (!circle || !text) return;

  let percentage = skillValue;
  let batasMax = skillValue;
  let batasMin = Math.max(0, skillValue - 5);
  let decreasing = true;

  function updateProgress() {
    if (decreasing) {
      percentage--;
      if (percentage <= batasMin) decreasing = false;
    } else {
      percentage++;
      if (percentage >= batasMax) decreasing = true;
    }

    let offset = 150.4 - (150.4 * percentage) / 100;
    circle.style.strokeDashoffset = offset;
    text.textContent = percentage + "%";
  }

  setInterval(updateProgress, 500);
}

async function fetchLanguages() {
  try {
    const res = await fetch("/.netlify/functions/getLanguages");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    // console.log("Languages data from serverless function:", data);

    const total = Object.values(data).reduce((a, b) => a + b, 0);

    const HTML = Math.round(((data.HTML || 0) / total) * 100);
    const CSSv = Math.round(((data.CSS || 0) / total) * 100);
    const JavaScript = Math.round(((data.JavaScript || 0) / total) * 100);
    const PHP = Math.round(((data.PHP || 0) / total) * 100);

    // contoh fungsi animateProgress dari kode kamu
    animateProgress(".progress-html", "cpuUsageHTML", HTML);
    animateProgress(".progress-css", "cpuUsageCSS", CSSv);
    animateProgress(".progress-js", "cpuUsageJS", JavaScript);
    animateProgress(".progress-php", "cpuUsagePHP", PHP);
    animateProgress(".progress-node", "cpuUsageNode", JavaScript);
    animateProgress(".progress-react", "cpuUsageReact", JavaScript);
  } catch (error) {
    console.error(error);
  }
}

fetchLanguages();

window.addEventListener("scroll", function () {
  let navbar = document.querySelector("header");
  if (window.scrollY > 0) {
    navbar.classList.add("box-shadow");
  } else {
    navbar.classList.remove("box-shadow");
  }
});

const brand = document.querySelector(".brand");
const img = document.querySelector(".container-img");

// form & textare
const value = document.querySelectorAll("input");
value.forEach((e) => (e.style.color = "white"));

document.querySelectorAll("textarea").forEach((e) => (e.style.color = "white"));

// project read more
const readMore = document.querySelector(".readMore");
const btnReadMore = document.querySelectorAll("#btnReadMore");
const AryaniGO = document.querySelector(".AryaniGO");
const right = document.querySelector("#right");
const left = document.querySelector("#left");

btnReadMore.forEach((btn) => {
  btn.addEventListener("click", function () {
    const container = btn.parentElement;
    const readMore = container.querySelector(".readMore");

    readMore.classList.toggle("none");

    if (readMore.classList.contains("none")) {
      btn.innerHTML = "Read More &raquo;";
    } else {
      btn.innerHTML = "&laquo; Read Less";
    }
  });
});

// nav active
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveNav() {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.nav-link[href="#${section.id}"]`)
          .classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
});

// menghitung umur
function hitungUmur(tanggalLahir) {
  const sekarang = new Date();
  const lahir = new Date(tanggalLahir);

  let umur = sekarang.getFullYear() - lahir.getFullYear();
  const bulan = sekarang.getMonth() - lahir.getMonth();
  const hari = sekarang.getDate() - lahir.getDate();

  if (bulan < 0 || (bulan === 0 && hari < 0)) {
    umur--;
  }

  return umur;
}

// Ambil elemen dan tanggal lahir dari atribut
const ageSpan = document.getElementById("age");
const tanggalLahir = ageSpan.dataset.birthdate;
const umur = hitungUmur(tanggalLahir);
ageSpan.textContent = umur;

// *
//  * TheaterJS, a typing effect mimicking human behavior.
//  *
//  * Github repository:
//  * https://github.com/Zhouzi/TheaterJS
//  *
//  */

var theater = theaterJS();

theater
  .on("type:start, erase:start", function () {
    theater.getCurrentActor().$element.classList.add("actor__content--typing");
  })
  .on("type:end, erase:end", function () {
    theater
      .getCurrentActor()
      .$element.classList.remove("actor__content--typing");
  })
  .on("type:start, erase:start", function () {
    if (theater.getCurrentActor().name === "vader") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });

theater
  .addActor("vader", { speed: 0.8, accuracy: 0.6 })
  .addActor("luke")
  .addScene("vader:Luke.", 600)
  .addScene("luke:What?", 400)
  .addScene("vader:I am your father.", 400)
  .addScene("luke:Nooo...", -3, "!!! ", 600, "No! ", 600)
  .addScene("luke:That's not true!", 600)
  .addScene("luke:That's impossible!", 400)
  .addScene("vader:Search your feelings.", 1600)
  .addScene("vader:You know it to be true.", 1000)
  .addScene("luke:Noooooooo! ", 600, "No!", 400)
  .addScene("vader:Luke.", 600)
  .addScene("vader:You can destroy the Emperor.", 1600)
  .addScene("vader:He has foreseen this. ", 800)
  .addScene("vader:It is your destiny.", 1600)
  .addScene("vader:Join me.", 800)
  .addScene("vader:Together we can rule the galaxy.", 800)
  .addScene("vader:As father and son.", 1600)
  .addScene("vader:Come with me. ", 800)
  .addScene("vader:It is the only way.", 2000)
  .addScene(theater.replay.bind(theater));
