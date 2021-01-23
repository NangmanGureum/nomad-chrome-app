// Weather

// const divWeather = document.querySelector(".js-weather"),
//   weatherInfo = divWeather.querySelector(".js-degree"),
//   degree = divWeather.querySelector(".js-degree"),
//   where = divWeather.querySelector(".js-where"),
//   weatherStatus = divWeather.querySelector(".js-status");

const COORDS_LS = "coords";
const WEATHER_API_KEY = "1139fa7768cd9fa13ca9ac787fda6f44";


function getCountry(code) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code)
}

function paintWether(obj) {
    degree.innerText = `${obj.temp}℃, ${obj.weather}`
    where.innerText = `at ${obj.city}, ${obj.country}`
    weatherInfo.classList.remove("hide");
    weatherStatus.classList.add("hide");
}

function getWether(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
    .then( (rsp) => {
            return rsp.json();
        }
    ).then(
        function(data) {

            const dataSys = data.sys;
            const dataMain = data.main;
            const dataWeather = data.weather[0]
            
            const temp = Math.floor(dataMain.temp);
            const country = getCountry(dataSys.country);
            const city = data.name;
            const weather = dataWeather.main;
            
            const weatherObj = {
                temp,
                city,
                country,
                weather
            }
            paintWether(weatherObj);
        }
    );
}


function saveCoords(coordsObj) {
    const coordsJSON = JSON.stringify(coordsObj);
    localStorage.setItem(COORDS_LS, coordsJSON);
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWether(latitude, longitude);
}

// Call When Faild
function handleGeoErr() {
    weatherStatus.innerText = "Load Faild";
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErr);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWether(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function weatherInit() {
    loadCoords();
}

weatherInit();