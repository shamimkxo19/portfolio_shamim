// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("nav-scroll");
  } else {
    header.classList.remove("nav-scroll");
  }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("active");

  // Change icon
  const icon = hamburger.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
    hamburger.querySelector("i").classList.remove("fa-times");
    hamburger.querySelector("i").classList.add("fa-bars");
  });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}

// Use Intersection Observer to trigger animation when skills section is in view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.getElementById("skills"));

// Animated Typing
const el = document.getElementById('animated');
const words = ["Shamim", "Ahmed"]; 
let wordIndex = 0;                 
let index = 0;                     
let typing = true;                 
const typeSpeed = 250;
const eraseSpeed = 150;
const pause = 700;
const emptyPause = 500; // 👈 pause on empty before new word

function tick() {
  const currentWord = words[wordIndex];

  if (typing) {
    index++;
    if (index > currentWord.length) {
      typing = false;              
      setTimeout(tick, pause);     
      return;
    }
  } else {
    index--;
    if (index < 0) {               //  now allow it to go fully blank
      index = 0;
      el.textContent = "";         // show empty string
      setTimeout(() => {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length; 
        tick();
      }, emptyPause);
      return;
    }
  }

  el.textContent = currentWord.slice(0, index);
  setTimeout(tick, typing ? typeSpeed : eraseSpeed);
}

setTimeout(tick, pause);

//Nav item selection Highlighter

document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll("nav ul li a").forEach((el) => el.classList.remove("active"));
    this.classList.add("active");

    // Close mobile menu
    navMenu.classList.remove("active");
    hamburger.querySelector("i").classList.remove("fa-times");
    hamburger.querySelector("i").classList.add("fa-bars");
  });
});

// Highlight based on scroll
const sections = document.querySelectorAll("section[id]"); // sections with IDs
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // adjust for navbar height
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});



