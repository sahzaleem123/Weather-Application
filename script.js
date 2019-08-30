let city;
// ye input ka function
function search() {
    if (event.keyCode == 13) {
        getWeather();
    }
}
// ye pura mechanism

function getWeather() {
    // ye sare variables
    city = document.querySelector('input').value;
    let cityName = document.getElementById('location');
    let cityWeather = document.getElementById('icon');
    let cityDescription = document.getElementById('description');
    let cityTemperature = document.getElementById('temp');
    let cityHumidity = document.getElementById('humidity');
    let cityWindSpeed = document.getElementById('wind-speed');
    let cityWeatherImg = document.getElementById('background');



    if (city == "") {
        alert("Enter City Name")
    }
    else {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a1de91cff4a7c15aee3c7031b172d39`)
            .then(function (response) {
                // handle success
                // City Name
                cityName.innerHTML = `${response.data.name},${response.data.sys.country}`;

                // Weather Icon Variable
                let weatherIcon = response.data.weather[0].icon
                // Weather Icon
                cityWeather.style.display = 'block'
                cityWeather.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

                // Background Defining Weather
                let backgroundClass = cityWeatherImg.className;
                backgroundClass.toString()

                if (weatherIcon == "01d") {
                    cityWeatherImg.classList.remove(backgroundClass)
                    cityWeatherImg.classList.add("sunny-day");
                }
                else if (weatherIcon == "01n") {
                    cityWeatherImg.classList.remove(backgroundClass)
                    cityWeatherImg.classList.add("clear-night");
                }
                else if (weatherIcon == "02d") {
                    cityWeatherImg.classList.remove(backgroundClass)
                    cityWeatherImg.classList.add("few-clouds");
                }
                else if (weatherIcon == "02n") {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("few-clouds-night");
                }
                else if (weatherIcon == "03d" || weatherIcon == "03n") {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("scattered-clouds");
                }
                else if (weatherIcon == "04d" || weatherIcon == "04n") {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("broken-clouds");
                }
                else if (weatherIcon == "13d" || weatherIcon == "13n") {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("weather-snow");
                }
                else if (weatherIcon == "50d" || weatherIcon == "50n") {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("mist");
                }
                else {
                    cityWeatherImg.classList.remove(backgroundClass);
                    cityWeatherImg.classList.add("weather-rain");
                }


                // Weather Description
                cityDescription.innerHTML = response.data.weather[0].description;

                // Temperature
                let celsius = Math.round(response.data.main.temp - 273.15);
                let fahrenheit = parseInt(celsius * 1.8 + 32);

                cityTemperature.innerHTML = `<i class="wi wi-thermometer"></i> ${celsius}<i class="wi wi-celsius"></i>`

                cityTemperature.addEventListener('click', () => {
                    if (cityTemperature.innerHTML === `<i class="wi wi-thermometer"></i> ${celsius}<i class="wi wi-celsius"></i>`) {
                        temp.innerHTML = `<i class="wi wi-thermometer"></i> ${fahrenheit}<i class="wi wi-fahrenheit"></i>`;
                    } else {
                        cityTemperature.innerHTML = `<i class="wi wi-thermometer"></i> ${celsius}<i class="wi wi-celsius"></i>`;
                    }
                });

                // Humidity
                cityHumidity.innerHTML = `Humidity: ${response.data.main.humidity}<i class="wi wi-humidity"></i> `

                // Wind Direction
                let windDeg = response.data.wind.deg;
                let windDegIcon;
                if (windDeg >= 0 && windDeg < 23) {
                    windDegIcon = `<i  class="wi wi-wind towards-0-deg"></i>`
                }
                else if (windDeg >= 23 && windDeg < 45) {
                    windDegIcon = `<i  class="wi wi-wind towards-23-deg"></i>`
                }
                else if (windDeg >= 45 && windDeg < 68) {
                    windDegIcon = `<i  class="wi wi-wind towards-45-deg"></i>`
                }
                else if (windDeg >= 68 && windDeg < 90) {
                    windDegIcon = `<i  class="wi wi-wind towards-68-deg"></i>`
                }
                else if (windDeg >= 90 && windDeg < 113) {
                    windDegIcon = `<i  class="wi wi-wind towards-60-deg"></i>`
                }
                else if (windDeg >= 113 && windDeg < 135) {
                    windDegIcon = `<i  class="wi wi-wind towards-113-deg"></i>`
                }
                else if (windDeg >= 135 && windDeg < 158) {
                    windDegIcon = `<i  class="wi wi-wind towards-135-deg"></i>`
                }
                else if (windDeg >= 158 && windDeg < 180) {
                    windDegIcon = `<i  class="wi wi-wind towards-158-deg"></i>`
                }
                else if (windDeg >= 180 && windDeg < 203) {
                    windDegIcon = `<i  class="wi wi-wind towards-180-deg"></i>`
                }
                else if (windDeg >= 203 && windDeg < 225) {
                    windDegIcon = `<i  class="wi wi-wind towards-203-deg"></i>`
                }
                else if (windDeg >= 225 && windDeg < 248) {
                    windDegIcon = `<i  class="wi wi-wind towards-225-deg"></i>`
                }
                else if (windDeg >= 248 && windDeg < 270) {
                    windDegIcon = `<i  class="wi wi-wind towards-248-deg"></i>`
                }
                else if (windDeg >= 270 && windDeg < 293) {
                    windDegIcon = `<i  class="wi wi-wind towards-270-deg"></i>`
                }
                else if (windDeg >= 293 && windDeg < 313) {
                    windDegIcon = `<i  class="wi wi-wind towards-293-deg"></i>`
                }
                else if (windDeg >= 313 && windDeg < 336) {
                    windDegIcon = `<i  class="wi wi-wind towards-313-deg"></i>`
                }
                else if (windDeg >= 336 && windDeg < 360) {
                    windDegIcon = `<i  class="wi wi-wind towards-336-deg"></i>`
                }
                // Wind Speed
                cityWindSpeed.innerHTML = `Wind: ${response.data.wind.speed}m/s ${windDegIcon}`

                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                cityName.innerHTML = `City Not Found <i class="fas fa-exclamation-triangle"></i>`
            })
            .finally(function () {
                // always executed
            });
    }
}