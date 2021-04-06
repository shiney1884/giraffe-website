const searchIcon = document.getElementById('search-icon');
const searchContainer = document.getElementById('search-container');

searchIcon.addEventListener('click', () => {
    searchContainer.classList.toggle('show');
})