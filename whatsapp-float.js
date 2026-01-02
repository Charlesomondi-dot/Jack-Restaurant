(function() {
  const number = '254711136309';

  function initWhatsAppModal() {
    const btn = document.getElementById('floating-whatsapp-btn');
    const modal = document.getElementById('whatsapp-modal');
    const backdrop = document.querySelector('.whatsapp-modal__backdrop');
    const closeBtn = document.getElementById('whatsapp-modal-close-btn');
    const form = document.querySelector('.whatsapp-modal__form');
    const formMessage = document.querySelector('.whatsapp-modal .form-message');

    if (!btn || !modal || !form) return;

    function openModal() {
      modal.removeAttribute('hidden');
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      form.reset();
      if (formMessage) formMessage.textContent = '';
    }

    btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    form.addEventListener('submit', event => {
      event.preventDefault();
      formMessage.textContent = '';

      const name = document.getElementById('wa-name').value.trim();
      const order = document.getElementById('wa-order').value.trim();
      const email = document.getElementById('wa-email').value.trim();
      const guests = document.getElementById('wa-guests').value;

      // Validate required fields
      if (!name) {
        formMessage.textContent = 'Name is required.';
        formMessage.style.color = '#f5c08d';
        return;
      }
      if (!order) {
        formMessage.textContent = 'Order is required.';
        formMessage.style.color = '#f5c08d';
        return;
      }
      if (!guests || guests < 1) {
        formMessage.textContent = 'Number of guests must be at least 1.';
        formMessage.style.color = '#f5c08d';
        return;
      }

      // Construct WhatsApp message
      const msgLines = [
        "Order Request - uPTOWN EDDUE'S RESTAURANT",
        '',
        `Name: ${name}`,
        `Order: ${order}`,
        `Email: ${email || 'N/A'}`,
        `Number of Guests: ${guests}`,
        '',
        'Thank you for your order!'
      ];
      const message = msgLines.join('\n');
      const encoded = encodeURIComponent(message);
      const waUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encoded}`;

      window.open(waUrl, '_blank');
      formMessage.textContent = 'Opening WhatsApp… Your message is ready to send.';
      formMessage.style.color = '#7be0a3';
      form.reset();
      setTimeout(closeModal, 2000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppModal);
  } else {
    initWhatsAppModal();
  }
})();
