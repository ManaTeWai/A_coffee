const modalOverlay = document.getElementById('modalOverlay');
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.open-modal-btn');

const handleCloseModal = () => {
  modal.classList.add('closing');
  modalOverlay.classList.add('closing');

  const handleAnimationEnd = () => {
    modalOverlay.style.display = 'none';
    document.body.classList.remove('modal-open');
    modal.classList.remove('closing');
    modalOverlay.classList.remove('closing');
    modal.removeEventListener('animationend', handleAnimationEnd);
  };

  modal.addEventListener('animationend', handleAnimationEnd, { once: true });
};

const handleOpenModal = () => {
  modalOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
};

// Обработчики событий
const handleClickOutside = (e) => {
  if (e.target.closest('.modal-overlay') || e.target.closest('.close-modal-btn')) {
    handleCloseModal();
  }
};

const handleEscape = (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('modal-open')) {
    handleCloseModal();
  }
};

// Инициализация
openModalBtn.addEventListener('click', handleOpenModal);
modalOverlay.addEventListener('click', handleClickOutside);
document.addEventListener('keydown', handleEscape);