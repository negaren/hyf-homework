// First call to the weather api
const url = 'https://api.openweathermap.org/data/2.5/weather?q=&appid=3b01cf506665bd4b74aa9154609bcbc4&units=metric'
const urlArray = url.split("q=");

const inputCity = document.getElementById('city-input');
const buttonCity = document.getElementById('city-button');
buttonCity.addEventListener('click', function (event) {

    if (inputCity.value.length !== 0) {
        const finalUrl = urlArray[0] + `q=${inputCity.value}` + urlArray[1];
        weatherRender(finalUrl);
        buttonCity.removeEventListener('click', event);
    }
    else {
        alert('Please enter a valid value as a city')
        buttonCity.removeEventListener('click', event);
    }
})

let counterMain = 0;
function weatherRender(finalUrl) {
    fetch(finalUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.name !== undefined) {
                ++counterMain;
                const cityName = document.getElementById('city-name');
                cityName.innerHTML = `${data.name}`
                const cityTemp = document.getElementById('temp');
                cityTemp.innerHTML = `${data.main.temp} °C`
                const iconImage = document.getElementById('icon-image');
                iconImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                const windSpeed = document.getElementById('wind-speed');
                windSpeed.innerHTML = `The wind speed is: ${data.wind.speed}`
                const cloud = document.getElementById('cloud');
                cloud.innerHTML = `${data.clouds.all}% cloudy`
                const sunRiseSet = document.getElementById('sunrise-sunset');
                const sunrise = new Date(data.sys.sunrise * 1000);
                const sunset = new Date(data.sys.sunset * 1000);
                sunRiseSet.innerHTML = `Sunrise: ${sunrise.toLocaleTimeString()}, Sunset: ${sunset.toLocaleTimeString()}`
                const cityLat = data.coord.lat;
                const cityLong = data.coord.lon;
                cityMap(cityLat, cityLong);
            }
        })

}


// codes according to display the map
function cityMap(cityLat, cityLong) {
    inputCity.addEventListener('click', () => {
        if (inputCity.value.length !== 0 || counter > 0) {
            location.reload();
        }
    })
    var map = L.map('map').setView([cityLat, cityLong], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([cityLat, cityLong]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(map);
    var marker = L.marker([cityLat, cityLong]).addTo(map);
    var circle = L.circle([cityLat, cityLong], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
    var polygon = L.polygon([
        [cityLat, cityLong],
        [cityLat, cityLong],
        [cityLat, cityLong]
    ]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");
    var popup = L.popup()
        .setLatLng([cityLat, cityLong])
        .setContent("I am a standalone popup.")
        .openOn(map);
}

// current position
let counter = 0 ;
const currentPositionBtn = document.getElementById('btn-current-position');
currentPositionBtn.addEventListener('click', () => {
    ++counter;
    if (counterMain > 0){
        location.reload();
    }
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
        const finalUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=3b01cf506665bd4b74aa9154609bcbc4&units=metric`
        weatherRender(finalUrl);
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
})


