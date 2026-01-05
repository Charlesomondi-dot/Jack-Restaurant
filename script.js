const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');
const form = document.querySelector('.reservation__form');
const formMessage = document.querySelector('.form-message');
const payNowBtn = document.getElementById('pay-now');
const WHATSAPP_NUMBER = '254711136309';
const menuButtons = Array.from(document.querySelectorAll('.menu-pay'));
const menuModal = document.getElementById('menu-modal');
const menuModalTitle = document.getElementById('menu-modal-title');
const menuModalDesc = document.querySelector('.menu-modal__desc');
const menuModalPrice = document.querySelector('.menu-modal__price');
const menuPayment = document.getElementById('menu-payment');
const menuPayNow = document.getElementById('menu-pay-now');
const menuViewMore = document.getElementById('menu-view-more');
const menuCloseBtn = document.querySelector('.menu-modal__close');
const menuBackdrop = document.querySelector('.menu-modal__backdrop');
const slides = Array.from(document.querySelectorAll('.slide'));
const sliderTrack = document.querySelector('.slider__track');
const prevBtn = document.querySelector('.slider__control.prev');
const nextBtn = document.querySelector('.slider__control.next');
let currentSlide = 0;
let currentMenuItem = null;

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

function getDeliveryAddressField() {
  return document.getElementById('delivery-address');
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
      payment: form.payment.value,
      deliveryAddress: form['delivery-address'].value,
    };

    const errors = validateForm(formData);
    if (errors.length) {
      formMessage.textContent = errors[0];
      formMessage.style.color = '#f5c08d';
      return;
    }

    // Compose WhatsApp reservation message
    const msgLines = [
      "Reservation Request - uPTOWN EDDUE'S RESTAURANT",
      '',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone || 'N/A'}`,
      `Email: ${formData.email || 'N/A'}`,
      `Date: ${formData.date}`,
      `Time: ${formData.time}`,
      `Guests: ${formData.guests}`,
      `Delivery Address: ${formData.deliveryAddress || 'N/A'}`,
      `Notes: ${formData.notes || 'N/A'}`,
      '',
      '📍 Please reply with a pinned location on WhatsApp for accurate delivery'
    ];
    const message = msgLines.join('\n');
    const encoded = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;

    // Open WhatsApp with prefilled message
    window.open(waUrl, '_blank');
    formMessage.textContent = 'Opening WhatsApp… If it does not open, ensure WhatsApp is installed and the number is active.';
    formMessage.style.color = '#7be0a3';
    form.reset();
  });

  if (payNowBtn) {
    payNowBtn.addEventListener('click', event => {
      event.preventDefault();
      formMessage.textContent = '';

      const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        date: form.date.value,
        deliveryAddress: form['delivery-address'].value,
        time: form.time.value,
        guests: form.guests.value,
        notes: form.notes.value,
        payment: form.payment.value,
      };

      const errors = validateForm(formData);
      if (errors.length) {
        formMessage.textContent = errors[0];
        formMessage.style.color = '#f5c08d';
        return;
      }

      const payLines = [
        "Payment Request - uPTOWN EDDUE'S RESTAURANT",
        '',
        `Name: ${formData.name}`,
        `Phone: ${formData.phone || 'N/A'}`,
        `Delivery Address: ${formData.deliveryAddress || 'N/A'}`,
        `Notes: ${formData.notes || 'N/A'}`,
        `Date: ${formData.date}`,
        `Time: ${formData.time}`,
        `Guests: ${formData.guests}`,
        `Payment: ${formData.payment || 'N/A'}`,
        '',
        'Please send a payment link or M-Pesa STK push to confirm.'
      ];
      const message = payLines.join('\n');
      const encoded = encodeURIComponent(message);
      const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;

      window.open(waUrl, '_blank');
      formMessage.textContent = 'Opening WhatsApp to request payment…';
      formMessage.style.color = '#7be0a3';
    });
  }
}

function openMenuModal(item) {
  if (!menuModal) return;
  currentMenuItem = item;
  menuModalTitle.textContent = item.name;
  menuModalDesc.textContent = item.desc;
  menuModalPrice.textContent = item.price;
  if (menuPayment) menuPayment.value = '';
  menuModal.removeAttribute('hidden');
}

function closeMenuModal() {
  if (!menuModal) return;
  menuModal.setAttribute('hidden', '');
  currentMenuItem = null;
}

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.closest('li');
    if (!li) return;
    const item = {
      name: li.dataset.name || li.querySelector('span')?.textContent || 'Menu item',
      price: li.dataset.price || '',
      desc: li.dataset.desc || li.querySelector('p')?.textContent || ''
    };
    openMenuModal(item);
  });
});

if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenuModal);
if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenuModal);
if (menuViewMore) menuViewMore.addEventListener('click', () => {
  closeMenuModal();
  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
});

if (menuPayNow) {
  menuPayNow.addEventListener('click', () => {
    if (!currentMenuItem) return;
    const paymentChoice = menuPayment?.value || '';
    const lines = [
      "Order Request - uPTOWN EDDUE'S RESTAURANT",
      '',
      `Item: ${currentMenuItem.name}`,
      `Price: ${currentMenuItem.price}`,
      `Details: ${currentMenuItem.desc || 'N/A'}`,
      `Payment: ${paymentChoice || 'N/A'}`,
      '',
      'Please send a payment link or M-Pesa STK push to confirm.'
    ];
    const msg = lines.join('\n');
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
    window.open(waUrl, '_blank');
  });
}

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape' && !menuModal?.hasAttribute('hidden')) {
    closeMenuModal();
  }
});

// WhatsApp Modal Handler
const whatsappModal = document.getElementById('whatsapp-modal');
const whatsappCloseBtn = document.querySelector('.whatsapp-modal__close');
const whatsappCloseBtnCancel = document.getElementById('whatsapp-modal-close-btn');
const whatsappBackdrop = document.querySelector('.whatsapp-modal__backdrop');
const whatsappForm = document.querySelector('.whatsapp-modal__form');
const floatingWhatsappBtn = document.querySelector('.floating-whatsapp');

function closeWhatsappModal() {
  if (!whatsappModal) return;
  whatsappModal.setAttribute('hidden', '');
  if (whatsappForm) whatsappForm.reset();
}

function openWhatsappModal() {
  if (!whatsappModal) return;
  whatsappModal.removeAttribute('hidden');
}

if (whatsappCloseBtn) {
  whatsappCloseBtn.addEventListener('click', closeWhatsappModal);
}

if (whatsappCloseBtnCancel) {
  whatsappCloseBtnCancel.addEventListener('click', closeWhatsappModal);
}

if (whatsappBackdrop) {
  whatsappBackdrop.addEventListener('click', closeWhatsappModal);
}

if (floatingWhatsappBtn) {
  floatingWhatsappBtn.addEventListener('click', openWhatsappModal);
}

if (whatsappForm) {
  whatsappForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = {
      name: whatsappForm.name.value,
      order: whatsappForm.order.value,
      email: whatsappForm.email.value,
      guests: whatsappForm.guests.value,
      deliveryAddress: whatsappForm['delivery-address'].value,
    };

    if (!formData.name.trim() || !formData.order.trim()) {
      alert('Please fill in name and order fields.');
      return;
    }

    const msgLines = [
      "Order Request - uPTOWN EDDUE'S RESTAURANT",
      '',
      `Name: ${formData.name}`,
      `Order: ${formData.order}`,
      `Email: ${formData.email || 'N/A'}`,
      `Number of Guests: ${formData.guests}`,
      `Delivery Address: ${formData.deliveryAddress || 'N/A'}`,
      '',
      '📍 Please pin your exact location on WhatsApp for faster delivery.'
    ];
    const message = msgLines.join('\n');
    const encoded = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;

    window.open(waUrl, '_blank');
    closeWhatsappModal();
  });
}

// Escape key to close WhatsApp modal
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape' && !whatsappModal?.hasAttribute('hidden')) {
    closeWhatsappModal();
  }
});
