
// import {searchValue} from './script';
const details = async() =>{
    const zip_code = localStorage.getItem("zip_store");
    const place_element = document.getElementById("place_text");
    const longitude_element = document.getElementById("longitude_text");
    const latitude_element = document.getElementById("latitude_text");
    const temparature_element = document.getElementById("Temperature_text");
    const realFeel_element = document.getElementById("realFeel_text");
    const description_element = document.getElementById("description_text");
    const minTemp_element = document.getElementById("minTemp_text");
    const maxTemp_element = document.getElementById("maxTemp_text");
    const pressure_element = document.getElementById("pressure_text");
    const humidity_element = document.getElementById("humidity_text");
    const windSpeed_element = document.getElementById("windSpeed_text");
    const visibility_element = document.getElementById("visibility_text");
    const seaLevel_element = document.getElementById("seaLevel_text");
    const sunrise_element = document.getElementById("sunrise_text");
    const sunset_element = document.getElementById("sunset_text");

    const offline_card_parent_element = document.getElementById("offline_card_parent");
    const allCards_element = document.getElementById("allCards");
    if(!navigator.onLine){
        offline_card_parent_element.style.display = "flex"
        allCards_element.style.display = "none";
        return;
    }

    try{
        console.log(zip_code)
        offline_card_parent_element.style.display = "none"
        allCards_element.style.display = "flex";
        const response = await fetch(`/api/weather?zip=${zip_code}`);
        if(response.ok){
            const weatherData = await response.json();
            place_element.innerText =  `${weatherData.name}`
            longitude_element.innerText = `${weatherData.coord.lon}E`
            latitude_element.innerText = `${weatherData.coord.lat}N`
            temparature_element.innerText = `${weatherData.main.temp}°c`
            realFeel_element.innerText = `${weatherData.main.feels_like}°c`
            description_element.innerText = `${weatherData.weather[0].description}`
            minTemp_element.innerText = `${weatherData.main.temp_min}°c`
            maxTemp_element.innerText = `${weatherData.main.temp_max}°c`
            pressure_element.innerText = `${(weatherData.main.pressure)*100} Pa`
            humidity_element.innerText = `${weatherData.main.humidity}%`
            windSpeed_element.innerText = `${(weatherData.wind.speed)*3.6} km/h`
            seaLevel_element.innerText = `${(weatherData.main.sea_level)*100} Pa`;
            visibility_element.innerText = `${(weatherData.visibility)/1000} km`
            sunrise_element.innerText = timeCalc(weatherData.sys.sunrise, weatherData.timezone);
            sunset_element.innerText = timeCalc(weatherData.sys.sunset, weatherData.timezone);
        }
        else{
            console.log(response);
            throw new Error('Failed to fetch weather data');
        }
    }catch{
        console.error("Error occurred");
    }
}


const timeCalc = (rowTime, timezone) =>{
    const sunriseLocalTime = rowTime+timezone;
    const hr = Math.floor((sunriseLocalTime/3600)%24);
    const min = Math.floor((sunriseLocalTime%3600)/60);
    const sec = Math.floor((sunriseLocalTime%60));
    return `${hr}hr: ${min}sec: ${sec}sec`;
}





const theme_button_fn = () =>{
    const current_theme = localStorage.getItem("theme_toggle");
    const changed_theme = current_theme === "light" ? "dark" : "light"
    localStorage.setItem("theme_toggle", changed_theme)
    const document_body_div_element = document.getElementById("document_body_div")
    const toggle_button_div_element = document.getElementById("toggle_button_div");
    const toggle_button_element = document.getElementById("theme_button");
    const night_theme_ico_element = document.getElementById("theme_moon_id");
    const light_theme_ico_element = document.getElementById("theme_sun_id");
    const offline_button_element = document.getElementById("offline_button_id");
    const allCard_element = document.querySelectorAll(".cards");

    toggle_button_div_element.classList.toggle("button_slide")
    toggle_button_element.classList.toggle("button_background")
    document_body_div_element.classList.toggle("dark_document_body");
    offline_button_element.classList.toggle("offline_button_change");
    allCard_element.forEach(card =>{
        card.classList.toggle("allCard_dark_body");
    })
    
    
    if (night_theme_ico_element.style.display === "none" ||night_theme_ico_element.style.display === "") {
        night_theme_ico_element.style.display = "flex";  // Show moon icon
        light_theme_ico_element.style.display = "none";  // Hide sun icon
        console.log("inside if")
    } else {
        console.log("inside else")
        night_theme_ico_element.style.display = "none";  // Hide moon icon
        light_theme_ico_element.style.display = "flex";  // Show sun icon
    }
}




window.onload = function(){
    details();
    if(localStorage.getItem("theme_toggle") === "dark"){
        theme_button_fn();
    }
    
}