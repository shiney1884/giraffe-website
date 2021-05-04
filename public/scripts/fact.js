const fact = document.getElementById('fact');
const facts = ['Glaciers and ice sheets hold about 69% of the worlds freshwater.', 'The fastest gust of wind ever recorded on Earth was 253 mph.', 'Dentistry is the oldest proffesion in the world.', 'North Korea and Cuba are they only places you cant buy Coca-Cola', 'The entire world population could fit inside Los Angeles', 'More people visit France that any other country', 'The worlds quietest room is located at Microsofts headquartes in Washington state.'];
const randomFactButton = document.getElementById('randomBtn');

randomFactButton.addEventListener('click', () => {
    const randomNum = Math.floor(Math.random() * facts.length);
    fact.innerHTML = facts[randomNum];
})