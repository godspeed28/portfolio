const HTML = 80;
const CSSv = 85;
const JavaScript = 40;
const NodeJs = 30;
const React = 20;
const PHP = 50;

function animateProgress(circleSelector, textSelector, skillValue) {
  let circle = document.querySelector(circleSelector);
  let text = document.getElementById(textSelector);
  
  let percentage = skillValue;
  let batasMax = skillValue;
  let batasMin = skillValue - 5;
  let decreasing = true;

  function updateProgress() {
      if (decreasing) {
          percentage--;
          if (percentage <= batasMin) decreasing = false;
      } else {
          percentage++;
          if (percentage >= batasMax) decreasing = true;
      }

      let offset = 188.4 - (188.4 * percentage) / 100;
      circle.style.strokeDashoffset = offset;
      text.textContent = percentage + "%";
  }

  setInterval(updateProgress, 500);
}
animateProgress(".progress-html", "cpuUsageHTML", HTML);
animateProgress(".progress-css", "cpuUsageCSS", CSSv);
animateProgress(".progress-js", "cpuUsageJS", JavaScript);
animateProgress(".progress-node", "cpuUsageNode", NodeJs);
animateProgress(".progress-react", "cpuUsageReact", React);
animateProgress(".progress-php", "cpuUsagePHP", PHP);


window.addEventListener("scroll", function () {
    let navbar = document.querySelector("header");
    if (window.scrollY > 0) {
      navbar.classList.add("box-shadow");
    } else {
      navbar.classList.remove("box-shadow");
    }
  });

const brand = document.querySelector('.brand');  
const img = document.querySelector('.container-img');

// form & textare
const value = document.querySelectorAll('input')
value.forEach((e => e.style.color = 'white'))

document.querySelectorAll('textarea').forEach(e => e.style.color = 'white')

// project read more

const readMore  = document.querySelector('.readMore');
const btnReadMore = document.getElementById('btnReadMore');
const AryaniGO = document.querySelector('.AryaniGO');
const right =  document.querySelector('#right');
const left =  document.querySelector('#left');

btnReadMore.addEventListener('click', function(){
  
  readMore.classList.toggle('none')
  if(readMore.classList.contains('none')){
    btnReadMore.innerHTML = 'Read More &raquo;'
  }else{
    btnReadMore.innerHTML = `&laquo; Read Less ` 
  }

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

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinks.forEach((link) => link.classList.remove("active"));
              document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add("active");
          }
      });
  }

  window.addEventListener("scroll", setActiveNav);
});


