// Переключение слайдов с помощью клавиатуры

  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Функция переключения слайдов
    function showSlide(index) {
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.style.display = 'flex';
        } else {
          slide.style.display = 'none';
        }
      });
    }

    // Показываем первый слайд при загрузке
    showSlide(currentSlide);

    // 1. Кнопки на экране
    const prevBtn = document.getElementById('prevBtn') || document.querySelector('.prev-btn');
    const nextBtn = document.getElementById('nextBtn') || document.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(currentSlide - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(currentSlide + 1); });

    // 2. Клавиатура (для ПК/ноутбука)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') showSlide(currentSlide - 1);
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') showSlide(currentSlide + 1);
    });

    // 3. Поддержка СВАЙПОВ на планшете (Touch events)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50; // минимальное расстояние пальцем для срабатывания

      if (swipeDistance < -minSwipeDistance) {
        // Свайп влево -> следующий слайд
        showSlide(currentSlide + 1);
      } else if (swipeDistance > minSwipeDistance) {
        // Свайп вправо -> предыдущий слайд
        showSlide(currentSlide - 1);
      }
    }
  });
