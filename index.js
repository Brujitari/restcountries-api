const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src=${country.flags.png} alt="flag" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");


fetch('https://restcountries.com/v3.1/all')
  .then(function (response) {
    return response.json()
  })
  .then(function (countries) {

    const countryList = countries.filter(country => country.name.common !== 'Israel')

    countriesNode.innerHTML = countryList.map(country => cardTemplate(country))

    let filter = (value) => countryList.filter(country => country.continents.includes(value)).map(country => cardTemplate(country))

    const listOfContinents = document.createElement('div')
    listOfContinents.style.display = 'flex'
    listOfContinents.style.flexDirection = 'column'
    listOfContinents.style.width = "200px"

    const selection = () => `
    <label id = 'label' for="countrySelection">Escoge un continente:</label>
    <select name = 'countrySelection' id = 'countrySelection'>
        <option value = 'todos'>Todos</option>
        <option value = 'North America'>North America</option>
        <option value = 'South America'>South America</option>
        <option value = 'Asia'>Asia</option>
        <option value = 'Africa'>Africa</option>
        <option value = 'Oceania'>Oceania</option>
        <option value = 'Antarctica'>Antarctica</option>
        <option value = 'Europe'>Europa</option>
      </select>
    `

    listOfContinents.innerHTML = selection()

    document.getElementById('title').insertAdjacentElement("afterend", listOfContinents)
    document.getElementById('countrySelection').addEventListener('change', (e) => {
      countriesNode.innerHTML = filter(e.target.value)
      //esto tampoco va: countriesNode.innerHTML = countryList.filter(country => country.continents.includes(e.target.value)).map(country => cardTemplate(country))
    })
  });

