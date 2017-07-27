const section = document.querySelector('section');
const load = document.querySelector('.load');
const apiKey = "a437f304e51a6aaec41a5fcf68641b6c";


// Success Geoloc: 
function success(pos) {
  console.log(pos)
  const crd = pos.coords
  const {
    latitude: lat,
    longitude: long
  } = crd
  takeWeather(lat, long)
}

//  Error geoloc: 
function error() {
  window.fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(resJson => window.fetch(`http://freegeoip.net/json/${resJson.ip}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const {
          latitude: lat,
          longitude: long
        } = data
        takeWeather(lat, long)
      })
    )
}

// Request :
function takeWeather(lat, long) {
  window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=fr&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(resJson => {
      const meteo = resJson
      affichage(meteo)
    })
}


//  Affichage:
function affichage(meteo) {
  load.style.display = 'none'
  console.log(meteo)
  const {
    description,
    icon
  } = meteo.weather[0]
  const temp = meteo.main.temp
  console.log(description)
  const html = `
    <div>
      <h2>${capitalize(meteo.name)}</h2>
      <img src="http://openweathermap.org/img/w/${icon}.png"/>
      <p class="description">${formatText(description)}</p>
      <p class="temp">${formatDeg(temp)}</p>
    </div>
  `
  section.innerHTML = html
}

// GEOLOC :
navigator.geolocation.getCurrentPosition(success, error)


//  Helpers :
function capitalize(text) {
  return text.toUpperCase();
}

function formatDeg(deg) {
  return `${Math.floor(deg)} C°`
}

function formatText(text) {
  return text
    .split(' ')
    .map(mot => mot[0].toUpperCase() + mot.slice(1))
    .join(' ')
}