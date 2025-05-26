const modalOverlay = document.getElementById('modalOverlay');
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.open-modal-btn');

// Модальное окно
const handleCloseModal = () => {
  modal.classList.add('closing');
  modalOverlay.classList.add('closing');

  const handleAnimationEnd = () => {
    modalOverlay.style.display = 'none';
    document.body.classList.remove('modal-open');
    modal.classList.remove('closing');
    modalOverlay.classList.remove('closing');
  };

  modal.addEventListener('animationend', handleAnimationEnd, { once: true });
};

const handleOpenModal = () => {
  modalOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
};

modalOverlay.addEventListener('click', (e) => {
  if (e.target.closest('.modal-overlay') || e.target.closest('.close-modal-btn')) {
    handleCloseModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('modal-open')) {
    handleCloseModal();
  }
});

openModalBtn?.addEventListener('click', handleOpenModal);

// Слайдеры
class Slider {
  constructor(blockSelector) {
    this.block = document.querySelector(blockSelector);
    if (!this.block) return;
    
    this.track = this.block.querySelector('.slider-track');
    this.slides = this.block.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.interval = null;
    this.autoplayDelay = blockSelector.includes('coffee') ? 5000 : 7000;

    this.init();
  }

  init() {
    this.createDots();
    this.addEventListeners();
    this.startAutoPlay();
  }

  addEventListeners() {
    this.block.querySelector('.slider-prev').addEventListener('click', () => this.move(-1));
    this.block.querySelector('.slider-next').addEventListener('click', () => this.move(1));
    
    this.block.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.block.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  move(direction) {
    this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  updateSlider() {
    this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    this.updateDots();
  }

  createDots() {
    const dotsContainer = this.block.querySelector('.slider-dots');
    this.slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    this.block.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.move(1), this.autoplayDelay);
  }

  stopAutoPlay() {
    clearInterval(this.interval);
  }
}

// Инициализация после загрузки контента
document.addEventListener('DOMContentLoaded', () => {
  new Slider('.coffee-slider');
  new Slider('.vape-slider');
});