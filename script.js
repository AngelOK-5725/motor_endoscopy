document.addEventListener('DOMContentLoaded', () => {
  // --- Меню (оставляем функционал прежний, только в одном обработчике) ---
  const menuButton = document.querySelector('.menu');
  const navList = document.querySelector('.nav-ul');

  if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
      navList.classList.toggle('menu-open');
      menuButton.classList.toggle('active'); // анимационный класс
    });

    // закрывать меню при клике на пункт
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('menu-open');
        menuButton.classList.remove('active');
      });
    });
  } else {
    console.warn('Menu or navigation list not found');
  }

  // --- Галерея-карусель (устойчивая реализация) ---
  const sliderContainer = document.querySelector('.gallery-container');
  const slides = Array.from(document.querySelectorAll('.gallery-slide'));
  const nextBtn = document.querySelector('.gallery-btn.next');
  const prevBtn = document.querySelector('.gallery-btn.prev');

  if (sliderContainer && slides.length > 0) {
    let index = 0;

    // Показывает слайд по индексу (без ошибок, проверка границ)
    function showSlide(i) {
      if (!slides.length) return;
      index = ((i % slides.length) + slides.length) % slides.length; // безопасный модуль
      slides.forEach((slide, sIdx) => {
        slide.classList.toggle('active', sIdx === index);
        // Для плавности: можно использовать также translateX, но оставим display-based поведение
      });
    }

    showSlide(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(index + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(index - 1);
      });
    }

    // свайп на мобильных (touch)
    let startX = null;
    sliderContainer.addEventListener('touchstart', e => {
      if (!e.touches || e.touches.length === 0) return;
      startX = e.touches[0].clientX;
    }, {passive: true});

    sliderContainer.addEventListener('touchend', e => {
      if (startX === null) return;
      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : null;
      if (endX === null) { startX = null; return; }
      const diff = startX - endX;
      if (diff > 50) { // свайп влево -> следующий
        nextBtn ? nextBtn.click() : showSlide(index + 1);
      } else if (diff < -50) { // свайп вправо -> предыдущий
        prevBtn ? prevBtn.click() : showSlide(index - 1);
      }
      startX = null;
    }, {passive: true});

    // стрелки клавиатуры (удобно на десктопе)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextBtn ? nextBtn.click() : showSlide(index + 1);
      } else if (e.key === 'ArrowLeft') {
        prevBtn ? prevBtn.click() : showSlide(index - 1);
      }
    });
  } else {
    // нет галереи — это нормально, просто не инициализируем
    // console.info('Gallery not found or no slides present');
  }
});
