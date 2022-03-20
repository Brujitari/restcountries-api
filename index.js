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
    const countryCards = countryList.map(country => cardTemplate(country))

    countriesNode.innerHTML = countryCards

    const continents = ['South America', 'Asia', 'Africa', 'Oceania', 'Antarctica', 'Europe']


    let america = countryList.filter(country => country.continents.includes('South America') || country.continents.includes('North America')).map(country => cardTemplate(country))
    let asia = countryList.filter(country => country.continents.includes('Asia')).map(country => cardTemplate(country))
    let africa = countryList.filter(country => country.continents.includes('Africa')).map(country => cardTemplate(country))
    let oceania = countryList.filter(country => country.continents.includes('Oceania')).map(country => cardTemplate(country))
    let antarctica = countryList.filter(country => country.continents.includes('Antarctica')).map(country => cardTemplate(country))
    let europe = countryList.filter(country => country.continents.includes('Europe')).map(country => cardTemplate(country))

    const listOfContinents = document.createElement('div')
    listOfContinents.style.display = 'flex'
    listOfContinents.style.flexDirection = 'column'
    listOfContinents.style.width = "200px"

    const selection = () => `
    <label id = 'label' for="countrySelection">Escoge un continente:</label>
    <select name = 'countrySelection' id = 'countrySelection'>
        <option value = 'todos'>Todos</option>
        <option value = 'america'>America</option>
        <option value = 'asia'>Asia</option>
        <option value = 'africa'>Africa</option>
        <option value = 'oceania'>Oceania</option>
        <option value = 'antarctica'>Antarctica</option>
        <option value = 'europe'>Europa</option>
      </select>
    `

    listOfContinents.innerHTML = selection()

    document.getElementById('title').insertAdjacentElement("afterend", listOfContinents)
    document.getElementById('countrySelection').addEventListener('change', (e) => {
      console.log(e.target.value)
      countriesNode.innerHTML = e.target.value
      //esto tampoco va: countriesNode.innerHTML = countryList.filter(country => country.continents.includes(e.target.value)).map(country => cardTemplate(country))
    })
  });

