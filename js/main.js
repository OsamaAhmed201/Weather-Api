// today card
var locations = document.getElementById("Location");
var asm_day = document.getElementById("asm_day");
var tarkh_day = document.getElementById("tarkh_day");
var grad_temporray = document.getElementById("grad_temporray");
var img_today = document.getElementById("img_today");
var desc = document.getElementById("desc");
var search = document.getElementById("search");
var wind = document.getElementById("wind");
var ryah = document.getElementById("ryah");
var posla = document.getElementById("posla")
var search = document.getElementById("search")
///////
var nextDay = document.getElementsByClassName("name_day");
var img_tomorow = document.getElementsByClassName("img_tomorow");
var max_grad = document.getElementsByClassName("max_grad");
var min_grad = document.getElementsByClassName("min_grad");
var Desc_tomorow = document.getElementsByClassName("Desc_tomorow");
var currentCity = "Cairo";
var apiRespons;
var reaponsData;
monthName = ['jan', 'Feb', 'March', 'April', 'May', 'June', 'Aug', 'spet', 'Oct', 'Nov', 'Dec']
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wendnesday",
  "Thursday",
  "Friday",
  "Saturday",

]

async function getDataWeather() {
  apiRespons = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e9333a9ba36c4ab98f0225607233004&q=${currentCity}&days=3`)
  reaponsData = await apiRespons.json()
 

  displayToday();
  displayNextDayWeather();
}
getDataWeather()

function displayToday() {
  let date = new Date();
  asm_day.innerHTML = days[date.getDay()];
  tarkh_day.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`
  locations.innerHTML = reaponsData.location.name;
  grad_temporray.innerHTML = reaponsData.current.temp_c;
  img_today.setAttribute("src", `https:${reaponsData.current.condition.icon}`);
  desc.innerHTML = reaponsData.current.condition.text;
  wind.innerHTML = reaponsData.current.humidity;
  ryah.innerHTML = reaponsData.current.wind_kph;
  posla.innerHTML = reaponsData.current.wind_dir;
}

function displayNextDayWeather() {
  for (let i=0; i<nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(reaponsData.forecast.forecastday[i+1].date).getDay()];
    img_tomorow[i].setAttribute('src', `https:${reaponsData.forecast.forecastday[i + 1].day.condition.icon}`);
    max_grad[i].innerHTML = reaponsData.forecast.forecastday[i+1].day.maxtemp_c;
    min_grad[i].innerHTML = reaponsData.forecast.forecastday[i+1].day.mintemp_c;
    Desc_tomorow[i].innerHTML = reaponsData.forecast.forecastday[i+1].day.condition.text;
  }
}


search.addEventListener("keyup", function () {
  currentCity = search.value;
  console.log(currentCity);
  getDataWeather()
})
