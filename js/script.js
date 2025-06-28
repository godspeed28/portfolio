// api github
const username = "godspeed28";
const token =
  "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"; // Ganti dengan token GitHub kamu

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

async function getAllLanguages(username, token) {
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!reposRes.ok) {
    console.error(
      "Failed to fetch repos:",
      reposRes.status,
      reposRes.statusText
    );
    return {};
  }

  const repos = await reposRes.json();

  const totalLanguages = {};

  for (const repo of repos) {
    const langUrl = repo.languages_url;
    const langRes = await fetch(langUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!langRes.ok) {
      console.warn(
        `Failed to fetch languages for ${repo.name}:`,
        langRes.status
      );
      continue;
    }

    const langData = await langRes.json();

    for (const [lang, bytes] of Object.entries(langData)) {
      const safeLang = lang.replace(/[^a-zA-Z0-9]/g, "");
      totalLanguages[safeLang] = (totalLanguages[safeLang] || 0) + bytes;
    }
  }

  return totalLanguages;
}

getAllLanguages(username, token).then((data) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  console.log(data);

  const HTML = Math.round(((data.HTML || 0) / total) * 100);
  const CSSv = Math.round(((data.CSS || 0) / total) * 100);
  const JavaScript = Math.round(((data.JavaScript || 0) / total) * 100);
  const PHP = Math.round(((data.PHP || 0) / total) * 100);
  const NodeJs = Math.round(((data.JavaScript || 0) / total) * 100);
  const React = Math.round(((data.JavaScript || 0) / total) * 100);

  animateProgress(".progress-html", "cpuUsageHTML", HTML);
  animateProgress(".progress-css", "cpuUsageCSS", CSSv);
  animateProgress(".progress-js", "cpuUsageJS", JavaScript);
  animateProgress(".progress-php", "cpuUsagePHP", PHP);
  animateProgress(".progress-node", "cpuUsageNode", NodeJs);
  animateProgress(".progress-react", "cpuUsageReact", React);
});

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
