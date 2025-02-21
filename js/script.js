const HTML = 80;
const CSSv = 85;
const JavaScript = 40;
const NodeJs = 30;
const React = 20;
const PHP = 50;

function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 10);
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + `%`;
          // Menambahkan efek glow dan lingkaran
          element.classList.add('glow');
    }, 10);
}
document.addEventListener("DOMContentLoaded", () => {
    animateNumber(document.querySelector(".HTML span"), 0, HTML, 2000);
    animateNumber(document.querySelector(".CSS span"), 0, CSSv, 2000);
    animateNumber(document.querySelector(".Script span"), 0, JavaScript, 2000);
    animateNumber(document.querySelector(".Node span"), 0, NodeJs, 2000);
    animateNumber(document.querySelector(".React span"), 0, React, 2000);
    animateNumber(document.querySelector(".PHP span"), 0, PHP, 2000);

});
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

// project slide show

const readMore  = document.querySelector('.readMore');
const btnReadMore = document.getElementById('btnReadMore');
const AryaniGO = document.querySelector('.AryaniGO');
const right =  document.querySelector('#right');
const left =  document.querySelector('#left');

btnReadMore.addEventListener('click', function(){
  
  readMore.classList.toggle('none')
  if(readMore.classList.contains('none')){
    btnReadMore.innerHTML = 'Read More >>'
  }else{
    btnReadMore.innerHTML = '<< Read Less'
  }

});

