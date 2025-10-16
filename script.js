document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu');
  const navList = document.querySelector('.nav-ul');

  if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
      navList.classList.toggle('menu-open');
      menuButton.classList.toggle('active'); // 🔹 добавляем анимационный класс
    });

    // закрывать меню при клике на пункт
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('menu-open');
        menuButton.classList.remove('active'); // 🔹 убираем активное состояние
      });
    });
  } else {
    console.warn('Menu or navigation list not found');
  }
});
