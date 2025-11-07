let currentSlide = {};

// Инициализация слайдера
function initSlider(id) {
  currentSlide[id] = 0;
  updateSlider(id);
}

// Переключение
function nextSlide(id) {
  const total = document.querySelectorAll(`#${id} img`).length;
  currentSlide[id] = (currentSlide[id] + 1) % total;
  updateSlider(id);
}

function prevSlide(id) {
  const total = document.querySelectorAll(`#${id} img`).length;
  currentSlide[id] = (currentSlide[id] - 1 + total) % total;
  updateSlider(id);
}

function goToSlide(id, index) {
  currentSlide[id] = index;
  updateSlider(id);
}

function updateSlider(id) {
  const slides = document.getElementById(id);
  const dots = slides.parentElement.querySelectorAll('.dot');
  slides.style.transform = `translateX(-${currentSlide[id] * 25}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide[id]));
}

// Запуск при загрузке
window.onload = () => {
  initSlider('slides-music');
  initSlider('slides-art'); 
};