let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getWeatherIcon(weatherType) {
    let icon;
    // TODO: try using switch statement here instead of if/else
    if (weatherType == "01d" || weatherType == "01n") {
        icon = "wi-day-sunny";

    }
    else if (weatherType == "02d" || weatherType == "02n") {
        icon = "wi-day-cloudy";
    }
    else if (weatherType == "03d" || weatherType == "03n") {
        icon = "wi-cloud";
    }
    else if (weatherType == "04d" || weatherType == "04n") {
        icon = "wi-cloudy";
    }
    else if (weatherType == "09d" || weatherType == "09n") {
        icon = "wi-showers";
    }
    else if (weatherType == "10d" || weatherType == "10n") {
        icon = "wi-day-rain";
    }
    else if (weatherType == "11d" || weatherType == "11n") {
        icon = "wi-thunderstorm";
    }
    else if (weatherType == "13d" || weatherType == "13n") {
        icon = "wi-snow";
    }
    else if (weatherType == "50d" || weatherType == "50n") {
        icon = "wi-fog";
    }
    return icon;
}


function getWeather() {
    
    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".weather-comment").style.display = "none";
    
    const cityName = document.querySelector("input").value;

    
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1cafa1aa713dc95fd5cd808d0df22dfc&units=metric`,
        success: function (data) {
            console.log(data);
            weatherType = data.weather[0].icon;
            document.querySelector(".cloud").innerHTML = `<i class="wi ${getWeatherIcon(weatherType)}"></i>`;
            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".temp > span").innerHTML = Math.round(data.main.temp);
            document.querySelector(".description").innerHTML = data.weather[0].main;
            document.querySelector(".min").innerHTML = Math.round(data.main.temp_min);
            document.querySelector(".max").innerHTML = Math.round(data.main.temp_max);
            
            let calcTime = new Date();
            let sunsetTime = new Date(data.sys.sunset * 1000);
            let sunriseTime= new Date(data.sys.sunrise * 1000);
            
            if (sunsetTime > calcTime && sunriseTime < calcTime){
                document.querySelector("body").style["background-image"]=`url(picture.jpg)`;
                document.querySelector("body").style["height"] =`100%`;
                document.querySelector("body").style["color"] = 'white'
                let list = document.querySelectorAll(".cards div");
                console.log(list);
                for(let i = 0; i < list.length; i++){
                    list[i].style.border = "1px solid #1e3178";
                    
                }
                
            } else {
                document.querySelector("body").style["background-image"]=`url(cosmo.jpg)`;
                document.querySelector("body").style["height"] =`100%`;
                document.querySelector("body").style["color"] = 'white';
                let list = document.querySelectorAll(".cards div");
                console.log(list);
                for(let i = 0; i < list.length; i++){
                    list[i].style.border = "1px solid white";
                  
                }
                let list2 = document.querySelectorAll(".cloudy, .cloud");
                console.log(list2);
                for(let i = 0; i < list2.length; i++){
                    list2[i].style.color = "white";
                  
                }
               
            }
        },
        
        error: function (err) {
            console.log(err);
            alert(err.responseJSON.message);
            document.querySelector(".weather-info").style.display = "none";
        }
    })

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=1cafa1aa713dc95fd5cd808d0df22dfc&units=metric`,
        success: function (data) {
            document.querySelector(".forcast").style.display = "block";
            for (let i = 1; i <= 5; i++) {
                const index = 8 * (i - 1);
                let d = new Date(data.list[index].dt * 1000);
                document.querySelector(`.day${i} > p`).innerHTML = days[d.getDay()];
                document.querySelector(`.date${i}`).innerHTML = `${months[d.getMonth()]} ${d.getDate()}`;
                document.querySelector(`.day${i} #temp > span`).innerHTML = Math.round(data.list[index].main.temp);
                document.querySelector(`.day${i} #cloud`).innerHTML = (data.list[index].weather[0].description);
                document.querySelector(`.cloud-${i}`).innerHTML = `<i class="wi ${getWeatherIcon(data.list[index].weather[0].icon)}"></i>`;
            }
        },
        
        error: function (error) {
            console.log(error);
            document.querySelector(".error").innerHTML = (error.responseJSON.message);
            document.querySelector(".weather-info").style.display = "none";
            document.querySelector(".main").style.display = "none";
            document.querySelector(".error").style.display = "block";
            
            
            
            
        }
        
    })
    
}

function mySubmitFunction() {
    return false;
}



