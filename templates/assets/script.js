'use strict';

// Menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// Fermer menu en cliquant ailleurs
document.addEventListener('click', (e) => {
  if (navLinks && !e.target.closest('nav')) {
    navLinks.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }
});

// Scroll actif sur le nav
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');
if (sections.length && navLinkItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

// Formulaire de contact — mailto fallback
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]')?.value || '';
    const email = contactForm.querySelector('[name="email"]')?.value || '';
    const message = contactForm.querySelector('[name="message"]')?.value || '';
    const recipient = contactForm.dataset.email || '';
    const subject = encodeURIComponent('Demande de contact - ' + document.title);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

// Animation d'apparition au scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, .service-item, .realisation-card, .testimonial-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);
