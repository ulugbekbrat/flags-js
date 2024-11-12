let div = document.querySelector('.box');
let body = document.querySelector('body');
let btn = document.querySelector('.btn');
let head = document.querySelector('header');
let searchInput = document.querySelector('.search');
let countries = [];

fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => {
        countries = data;
        displayCountries(countries);

        if (btn) {
            btn.addEventListener('click', () => {
                body.classList.toggle('dark');
                head.classList.toggle('dark2');
            });
        }
    })
    .catch((error) => console.error('Error fetching data:', error));

function displayCountries(data) {
    div.innerHTML = '';
    for (let item of data) {
        div.innerHTML += `
            <div>
                <img src="${item.flags.png}" alt="${item.name.common} flag">
                <h2>${item.name.common}</h2>
            </div>
        `;
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredCountries = countries.filter(country => 
            country.name.common.toLowerCase().includes(query)
        );
        displayCountries(filteredCountries);
    });
}
