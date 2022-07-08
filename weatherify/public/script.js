const btn = document.getElementById("btn");
const tempy = document.getElementById("tempy");
const city_name = document.getElementById("city_name");
let weatherLogo = document.getElementById("weather_logo");
let add_info = document.getElementById("add_info");
let data_hide = document.getElementById("data_hide");

function alerting(event) {
  event.preventDefault();
  // On clicking the search wala btn, link was been changed, sol to prevent that we have used event.preventDeafult
  async function weather() {
    const city = city_name.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36af2faf4aea1e8f80921b21abd7f6c8&units=metric`;
    if (city === "") {
      data_hide.style.opacity = 0;

      add_info.innerText = "City Name Cannot Be Empty";
    } else {
      try {
        data_hide.style.opacity = 1;
        const tempData = await fetch(url);
        const actualData = await tempData.json();
        const dataArr = [actualData];
        const temperature = dataArr[0].main.temp;
        tempy.innerText = `${temperature}℃`;
        const weather_status = dataArr[0].weather[0].main;
        add_info.innerText = `${dataArr[0].name}, ${dataArr[0].sys.country}`;

        let hours = new Date().getHours();

        if (hours >= 20 && hours <= 4 && weather_status == "Rain") {
          weatherLogo.innerHTML = `<i class="fa-solid fa-cloud-moon-rain fa-2x"></i>`;
        } else if (weather_status == "Rain") {
          weatherLogo.innerHTML = `<i class="fa-solid fa-cloud-sun-rain fa-2x"></i>`;
        } else if (hours >= 20 && hours <= 4 && weather_status == "Clouds") {
          weatherLogo.innerHTML = `<i class="fa-solid fa-cloud-moon fa-2x"></i>`;
        } else if (weather_status == "Clouds") {
          weatherLogo.innerHTML = `<i class="fa-solid fa-cloud-sun fa-2x"></i>`;
        } else if (temperature < 20) {
          weatherLogo.innerHTML = `<i class="fa-solid fa-hat-winter fa-2x"></i>`;
        } else if (hours >= 20 && hours <= 5) {
          weatherLogo.innerHTML = `<i class="fa-solid fa-moon-stars fa-2x"></i>`;
        } else {
          weatherLogo.innerHTML = `<i class="fa-solid fa-sun-bright"></i>`;
        }
      } catch (error) {
        data_hide.style.opacity = 0;
        add_info.innerText = `Please Write City Name Correctly`;
      }
    }
  }
  weather();
}

btn.addEventListener("click", alerting);
