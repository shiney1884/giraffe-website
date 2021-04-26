const fact = document.getElementById('fact');
const facts = ['Fact1', 'Fact2', 'Fact3', 'Fact4', 'Fact5'];
const randomFactButton = document.getElementById('randomBtn');

randomFactButton.addEventListener('click', () => {
    const randomNum = Math.floor(Math.random() * facts.length);
    fact.innerHTML = facts[randomNum];
})