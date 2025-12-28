const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');
const form = document.querySelector('.reservation__form');
const formMessage = document.querySelector('.form-message');
const slides = Array.from(document.querySelectorAll('.slide'));
const sliderTrack = document.querySelector('.slider__track');
const prevBtn = document.querySelector('.slider__control.prev');
const nextBtn = document.querySelector('.slider__control.next');
let currentSlide = 0;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateSlider(index) {
  if (!slides.length || !sliderTrack) return;
  currentSlide = (index + slides.length) % slides.length;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => updateSlider(currentSlide - 1));
  nextBtn.addEventListener('click', () => updateSlider(currentSlide + 1));
  setInterval(() => updateSlider(currentSlide + 1), 7000);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function validateForm(data) {
  const errors = [];
  if (!data.name.trim()) errors.push('Name is required.');
  const phoneFilled = data.phone.trim().length > 6;
  const emailFilled = data.email.trim().length > 5;
  if (!phoneFilled && !emailFilled) errors.push('Provide a phone or email.');
  if (!data.date) errors.push('Date is required.');
  if (!data.time) errors.push('Time is required.');
  const guestsNum = Number(data.guests);
  if (!guestsNum || guestsNum < 1) errors.push('Guests must be at least 1.');

  const selectedDate = new Date(`${data.date}T${data.time}`);
  if (data.date && data.time && selectedDate < new Date()) {
    errors.push('Please choose a future time.');
  }
  return errors;
}

if (form && formMessage) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    formMessage.textContent = '';

    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      date: form.date.value,
      time: form.time.value,
      guests: form.guests.value,
      notes: form.notes.value,
    };

    const errors = validateForm(formData);
    if (errors.length) {
      formMessage.textContent = errors[0];
      formMessage.style.color = '#f5c08d';
      return;
    }

    formMessage.textContent = 'Reservation received. We will confirm shortly by phone or email.';
    formMessage.style.color = '#7be0a3';
    form.reset();
  });
}
