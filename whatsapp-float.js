(function() {
  const number = '254796978358';
  const defaultMessage = "Hi Jack's Hearth Kitchen!\n\nName: \nOrder: \nEmail: \nNumber of guests: ";
  const encoded = encodeURIComponent(defaultMessage);
  const href = `https://api.whatsapp.com/send?phone=${number}&text=${encoded}`;

  function ensureButton() {
    if (document.querySelector('.floating-whatsapp')) return;

    const a = document.createElement('a');
    a.href = href;
    a.className = 'floating-whatsapp';
    a.title = 'Get Started on WhatsApp';
    a.setAttribute('aria-label', 'Get Started on WhatsApp');
    a.target = '_blank';
    a.rel = 'noopener';

    a.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.993 1.271c-1.546.921-2.791 2.22-3.599 3.715-.81 1.494-1.172 3.127-.87 4.783.304 1.656 1.25 3.145 2.688 4.238 1.438 1.092 3.23 1.75 5.132 1.75h.005c1.902 0 3.694-.658 5.132-1.75 1.438-1.092 2.384-2.582 2.688-4.238.303-1.656-.06-3.289-.87-4.783-.808-1.495-2.053-2.794-3.599-3.715a9.87 9.87 0 00-4.992-1.271zm-9.256 11.993c-1.1-.771-2.047-1.76-2.709-2.948-.66-1.188-.953-2.531-.85-3.918.102-1.388.569-2.706 1.362-3.82.793-1.115 1.87-2.007 3.102-2.56 1.232-.554 2.6-.798 3.984-.71 1.385.087 2.715.515 3.83 1.246 1.115.731 2.007 1.81 2.56 3.04.554 1.231.798 2.6.71 3.984-.087 1.385-.515 2.715-1.246 3.83-.731 1.115-1.81 2.007-3.04 2.56-1.231.554-2.6.798-3.984.71-1.385-.087-2.715-.515-3.83-1.246"/>
      </svg>
      <span class="whatsapp-label">Get Started</span>
    `;

    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureButton);
  } else {
    ensureButton();
  }
})();
