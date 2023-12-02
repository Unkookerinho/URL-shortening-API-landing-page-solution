const menu = document.querySelector('.btn__menu');
const navbar = document.querySelector('nav');

menu.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('active');
});
