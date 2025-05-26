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

class Slider {
  constructor(blockSelector) {
    this.block = document.querySelector(blockSelector);
    this.track = this.block.querySelector('.slider-track');
    this.slides = this.block.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    // Создаем индикаторы
    this.createDots();
    
    // Добавляем обработчики
    this.block.querySelector('.slider-prev').addEventListener('click', () => this.move(-1));
    this.block.querySelector('.slider-next').addEventListener('click', () => this.move(1));
    
    // Запускаем автопрокрутку
    this.startAutoPlay();
    
    // Пауза при наведении
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
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if(index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  updateDots() {
    this.block.querySelectorAll('.slider-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.move(1), 5000);
  }
  
  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// Инициализация слайдеров
new Slider('.coffee-slider');
new Slider('.vape-slider');