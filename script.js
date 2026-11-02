// Tripzi Travels photo viewer. Supports clicks, arrow keys and Escape.
(() => {
  const photos = [...document.querySelectorAll('.gallery img, .extra-gallery img')];
  const dialog = document.querySelector('#photo-lightbox');
  const enlarged = dialog.querySelector('img');
  let current = 0;

  function show(index) {
    current = (index + photos.length) % photos.length;
    enlarged.src = photos[current].src;
    enlarged.alt = photos[current].alt;
  }

  photos.forEach((photo, index) => {
    const card = photo.closest('figure');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View photo: ' + photo.alt);
    const open = () => { show(index); dialog.showModal(); };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
