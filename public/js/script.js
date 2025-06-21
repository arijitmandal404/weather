
const clock = () =>{
    const now = new Date();
    const hour_int = now.getHours() % 12 || 12 ;
    const hour_formatted = hour_int <10 ? '0'+ hour_int.toString() : hour_int
    const minutes_int =  now.getMinutes()
    const minutes_formatted = minutes_int <10 ? '0'+minutes_int.toString() : minutes_int
    const day = now.toString().split(' ')[0]
    const month = now.toString().split(' ')[1]
    const date = now.toString().split(' ')[2];
    const year = now.getFullYear();
    const ampm = hour_int >=12? 'AM' : 'PM';

    const formatteddate = `${day}, ${month} ${date}, ${year}, ${hour_formatted}:${minutes_formatted} ${ampm}`;

    const dateTime = document.getElementById("time");

    dateTime.innerText = formatteddate;

    icon(now.getHours());

}

const icon = (time) => {

    const get_sun_ico = document.getElementById("sun_ico_id");
    const get_moon_ico = document.getElementById("moon_ico_id");
    if(time>=18 || time<=6){
        get_sun_ico.style.display = "none";
        get_moon_ico.style.display = "flex";

    }else{
        get_sun_ico.style.display = "flex";
        get_moon_ico.style.display = "none"
    }
}

const syncClock = () =>{
    const now_sec = new Date();
    const sec = now_sec.getSeconds()
    const timeout = (60-sec)*1000;

    clock();

    setTimeout(() => {
        clock();
        console.log("inside timeout")
        setInterval(clock, 60000);
    }, timeout);

}




const button_fn = async() => {
    const searchValue = document.getElementById("search").value.trim("");
    const temp_element = document.getElementById("temp_text");
    const feels_like_element = document.getElementById("real_feel_text");
    const desc_element = document.getElementById("desc_id");
    const wind_speed_element = document.getElementById("wind_speed_id");
    const humidity_element = document.getElementById("humidity_id");
    const place_element = document.getElementById("place");
    const loading_element = document.getElementById("loading_icon_id");
    const refresh_span_element = document.getElementById("refresh_text");
    const offline_card_parent_element = document.getElementById("offline_card_parent");
    const weather_card_parent_element = document.getElementById("weather_card_parent");
    const search_parent__element = document.getElementById("search_parent_id");
    const more_element = document.getElementById("more_id");


    if(!navigator.onLine){
        weather_card_parent_element.style.display = "none";
        search_parent__element.style.display = "none";
        offline_card_parent_element.style.display = "flex";
        return;
    }

    try {
        
        offline_card_parent_element.style.display = "none"
        refresh_span_element.innerText = ""
        loading_element.style.display = "block"
        weather_card_parent_element.style.display = "flex";
        search_parent__element.style.display = "flex";
        localStorage.setItem('zip_store', searchValue || "722121");
        const response = await fetch(`/api/weather?zip=${searchValue}`); 
        if (!response.ok) {
            console.log(response)
            alert("Enter correct Pin/ZIP and try again")
            refresh_span_element.innerText = "Refresh"
            loading_element.style.display = "none"
            place_element.innerText = "";
            temp_element.innerText = "";
            feels_like_element.innerText = "";
            desc_element.innerText = "";
            wind_speed_element.innerText = "";
            humidity_element.innerText = "";
            more_element.style.display = "none";
            // throw new Error('Failed to fetch weather data');

            return;
        }else{
            more_element.style.display = "flex";
            console.log(response)
            refresh_span_element.innerText = "Refresh"
            loading_element.style.display = "none"
            
            const weatherData = await response.json();
            console.log(weatherData)

            place_element.innerText = `${weatherData.name}`;
            temp_element.innerText = `${weatherData.main.temp}°c`;
            feels_like_element.innerText = `Real Feel: ${weatherData.main.feels_like}°`;
            desc_element.innerText = `${weatherData.weather[0].description}`;
            wind_speed_element.innerText = `${weatherData.wind.speed} km/h`;
            humidity_element.innerText = `${weatherData.main.humidity}%`;

        }
    } catch (error) {
        console.error("Error updating temperature:", error);
    }
    
}

const theme_button_fn = () =>{
    const current_theme = localStorage.getItem("theme_toggle");
    const changed_theme = current_theme === "light" ? "dark" : "light";
    localStorage.setItem("theme_toggle", changed_theme);
    console.log(localStorage.getItem("theme_toggle"));
    console.log(changed_theme)
    const document_body_div_element = document.getElementById("document_body_div")
    const weather_body_element = document.getElementById("weather_card_child");
    const toggle_button_div_element = document.getElementById("toggle_button_div");
    const toggle_button_element = document.getElementById("theme_button");
    const night_theme_ico_element = document.getElementById("theme_moon_id");
    const light_theme_ico_element = document.getElementById("theme_sun_id");
    const offline_button_element = document.getElementById("offline_button_id");
    const refresh_button_element = document.getElementById("refresh_button_id");
    const search_area_element = document.getElementById("search_child_id");
    const textarea_element = document.getElementById("search");
    const offline_text_elemet = document.getElementById("offline_card_child_id");

    toggle_button_div_element.classList.toggle("button_slide")
    toggle_button_element.classList.toggle("button_background")
    document_body_div_element.classList.toggle("dark_document_body");
    weather_body_element.classList.toggle("dark_weather_body")
    offline_button_element.classList.toggle("offline_button_change");
    offline_text_elemet.classList.toggle("offline_text_color_change");
    refresh_button_element.classList.toggle("refresh_button_change");
    search_area_element.classList.toggle("search_area_change");
    textarea_element.classList.toggle("search_area_change")
    
    
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

//need improvement

const maxSet = () =>{
    console.log("pressed")
    const getValObject = document.getElementById("search");
    
    if(getValObject.value.length > 6){
        getValObject.value = getValObject.value.slice(0, 6);
        console.log("hit");
        console.log(getValObject.value)
    }
    
}




const search_fn = () =>{
    button_fn();
}

window.onload = function () {
    localStorage.setItem("theme_toggle", "light");
    button_fn();
    syncClock();
};






// Fetch JSON directly from url

// const button_fn = async() => {

//     const apiKey = "367d3f77518e79f2da0ae67ffb8adce2";
//     const zipCode = "722121";
//     const countryCode = "in";

//     const temp_element = document.getElementById("temp_id");
//     const locElement = document.getElementById("loc");

//     if(!navigator.onLine){
//         temp_element.innerText =  "Check internet connection";
//         locElement.innerText = "";
//         return;
//     }

//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`); 
//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data');
//         }
//         const weatherData = await response.json();
        
//         temp_element.innerText = `Temp: ${weatherData.main.temp} ℃`; 
//     } catch (error) {
//         console.error("Error updating temperature:", error);
//     }
// }

// window.onload = button_fn;
