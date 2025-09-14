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
const words = ["Shamim", "Ahmed"]; // words to cycle
let wordIndex = 0;                 // current word in the array
let index = 0;                     // character index
let typing = true;                 // true = typing, false = erasing
const typeSpeed = 250;
const eraseSpeed = 150;
const pause = 700;

function tick() {
  const currentWord = words[wordIndex];

  if (typing) {
    index++;
    if (index > currentWord.length) {
      typing = false;               // switch to erasing
      setTimeout(tick, pause);      // pause at full word
      return;                        // stop this tick
    }
  } else {
    index--;
    if (index <= 0) {               // fixed boundary
      index = 0;                    // prevent negative index
      typing = true;                // switch to typing
      wordIndex = (wordIndex + 1) % words.length; // next word
      setTimeout(tick, pause);      // optional pause before typing
      return;                        // stop this tick to avoid slice(0, -1)
    }
  }

  el.textContent = currentWord.slice(0, index);
  setTimeout(tick, typing ? typeSpeed : eraseSpeed);
}

// Start the animation
setTimeout(tick, pause);


