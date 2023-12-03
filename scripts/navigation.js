const menu = document.querySelector('.btn__menu');
const navbar = document.querySelector('nav');

menu.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('active');
});

const scrollButtons = document.querySelectorAll('.btn__oval--get-started');

scrollButtons.forEach((scrollButton) => {
  scrollButton.addEventListener('click', () => {
    document.querySelector('.hero__text p').scrollIntoView();
  });
});
