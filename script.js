const grantAccessCont=document.querySelector('.grant-loc-container');
const loadingScreen = document.querySelector(".loading-container");
const weatherInfoCont = document.querySelector(".weather-info-container");
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
const weatherContainer=document.querySelector(".container");
const grantAccessBtn=document.querySelector("[data-grantAccess");
const wCont= document.querySelector(".w-cont")
getfromSessionStorage();
wCont.classList.add("active");
grantAccessBtn.addEventListener('click',getLocation);

function getLocation(){
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        if(!localCoordinates) {
            //agar local coordinates nahi mile
            grantAccessCont.classList.add("active");
        }
        else {
            const coordinates = JSON.parse(localCoordinates);
            fetchUserWeatherInfo(coordinates);
            

        }
    }
}
function showPosition(position){
    const userCords={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCords));
    fetchUserWeatherInfo(userCords);
}
function getfromSessionStorage(){
    const localcoords = sessionStorage.getItem("user-coordinates");
}

async function fetchUserWeatherInfo(coordinates){
    const{lat,lon}=coordinates;
    wCont.classList.remove("active");
    grantAccessCont.classList.add("active");
    loadingScreen.classList.add("active");
    
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data= await response.json();
        loadingScreen.classList.remove("active");
        weatherContainer.classList.remove("active");
        renderWeatherInfo(data);      
    }
    catch(err){
        loadingScreen.classList.remove("active");
        alert("Location Access Denied!!");
    }
}
function renderWeatherInfo(weatherInfo){
    const cityName= document.querySelector("[data-cityName]");
    const countryIcon= document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon= document.querySelector("[data-weatherIcon]");
    const temp= document.querySelector("[data-temp");
    const windspeed= document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
    console.log(weatherInfo);
    cityName.innerText=weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}