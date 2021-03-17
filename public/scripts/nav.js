const burger = document.getElementById('burger');
const links = document.getElementById('links');
const signInLink = document.getElementById('sign-in-link');
const burgerSpan1 = document.getElementById('first-bar');
const burgerSpan2 = document.getElementById('second-bar');
const burgerSpan3 = document.getElementById('third-bar');

burger.addEventListener('click', ()=> {
    links.classList.toggle('down');
    signInLink.classList.toggle('down');
    burgerSpan1.classList.toggle('first-bar');
    burgerSpan2.classList.toggle('second-bar');
    burgerSpan3.classList.toggle('third-bar');
})