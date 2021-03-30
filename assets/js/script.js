let searchBtn = $(".searchBtn");
let myApiKey = "893ff05bdee79e124f599f2c338ddd1a";
let searchBox = $(".searchBox");
let priorSearches = $(".priorSearches");
let dateTime = moment().format("l");

// Left side of page
let currentDateTime = $(".currentDateTime");
let cities = $(".cityHeader");
let searchIcon = $(".searchIcon");
let history = $(".historyItems");

// search button
searchBtn.on("click", function () {
    console.log("search button clicked");

    // let pos = 0;
    // let inputStorage = searchBox.val();
    // localStorage.setItem(pos, inputStorage);
    // pos++;
    // console.log("push me again");

    setStorage();


    let city = searchBox.val();
    getWeather(city);
});

function getWeather(city) {
    console.log("In get weather Function");
    console.log(city);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${myApiKey}`;
    $.ajax({
        url: apiUrl,
        method: "GET",
    }).then(function (response) {
        let temperature = Math.round(response.main.temp);
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let longtitude = response.coord.lon;
        let latitude = response.coord.lat;
        let searchIcon = response.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/wn/" + searchIcon + "@2x" + ".png";

        let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&exclude={part}&APPid=${myApiKey}`;
        $.ajax({
            url: apiUrl2,
            method: "GET",
        }).then(function (responseAll) {
            console.log(responseAll);
            let uvIndex = responseAll.current.uvi;

            let weatherIconDay1 = responseAll.daily[0].weather[0].icon;
            let weatherIconDay2 = responseAll.daily[1].weather[0].icon;
            let weatherIconDay3 = responseAll.daily[2].weather[0].icon;
            let weatherIconDay4 = responseAll.daily[3].weather[0].icon;
            let weatherIconDay5 = responseAll.daily[4].weather[0].icon;

            let urlWeatherIconDay1 = "http://openweathermap.org/img/wn/" + weatherIconDay1 + "@2x" + ".png";
            let urlWeatherIconDay2 = "http://openweathermap.org/img/wn/" + weatherIconDay2 + "@2x" + ".png";
            let urlWeatherIconDay3 = "http://openweathermap.org/img/wn/" + weatherIconDay3 + "@2x" + ".png";
            let urlWeatherIconDay4 = "http://openweathermap.org/img/wn/" + weatherIconDay4 + "@2x" + ".png";
            let urlWeatherIconDay5 = "http://openweathermap.org/img/wn/" + weatherIconDay5 + "@2x" + ".png";

            var temp1Hold = (Math.round(responseAll.daily[0].temp.day));
            var temp2Hold = (Math.round(responseAll.daily[1].temp.day));
            var temp3Hold = (Math.round(responseAll.daily[2].temp.day));
            var temp4Hold = (Math.round(responseAll.daily[3].temp.day));
            var temp5Hold = (Math.round(responseAll.daily[4].temp.day));

            $(".card-temp1").html("<p>Temperature: " + temp1Hold + "</p>");
            $(".card-temp2").html("<p>Temperature: " + temp2Hold + "</p>");
            $(".card-temp3").html("<p>Temperature: " + temp3Hold + "</p>");
            $(".card-temp4").html("<p>Temperature: " + temp4Hold + "</p>");
            $(".card-temp5").html("<p>Temperature: " + temp5Hold + "</p>");


            $(".card-humid1").html("<p>Humidity: " + responseAll.daily[0].humidity + "</p>");
            $(".card-humid2").html("<p>Humidity: " + responseAll.daily[1].humidity + "</p>");
            $(".card-humid3").html("<p>Humidity: " + responseAll.daily[2].humidity + "</p>");
            $(".card-humid4").html("<p>Humidity: " + responseAll.daily[3].humidity + "</p>");
            $(".card-humid5").html("<p>Humidity: " + responseAll.daily[4].humidity + "</p>");


            $(".card-image1").attr("src", urlWeatherIconDay1);
            console.log(urlWeatherIconDay1)
            $(".card-image2").attr("src", urlWeatherIconDay2);
            $(".card-image3").attr("src", urlWeatherIconDay3);
            $(".card-image4").attr("src", urlWeatherIconDay4);
            $(".card-image5").attr("src", urlWeatherIconDay5);

            var date1 = moment().add(1, 'days').format('LL');
            var date2 = moment().add(2, 'days').format('LL');
            var date3 = moment().add(3, 'days').format('LL');
            var date4 = moment().add(4, 'days').format('LL');
            var date5 = moment().add(5, 'days').format('LL');

            $(".date1").html("<h5>" + date1 + "</h5>");
            $(".date2").html("<h5>" + date2 + "</h5>");
            $(".date3").html("<h5>" + date3 + "</h5>");
            $(".date4").html("<h5>" + date4 + "</h5>");
            $(".date5").html("<h5>" + date5 + "</h5>");


            $(".cityHeader").html("<h1>" + searchBox.val() + " " + "(" + dateTime + ")" + "</h1>").addClass("cityHeader");

            $(".temperature").html("<p>Temperature: " + temperature + "</p>");
            $(".humidity").html("<p>Humidity: " + humidity + "</p>");
            $(".windSpeed").html("<p>Wind Speed: " + windSpeed + "</p>");
            $(".uvIndex").html("<p>UV Index: " + uvIndex + "</p>");
            $(".weatherPic").attr("src", iconURL);
        })
    });
}


$(".cityHeader").append(" " + dateTime);

function setStorage() {
    localStorage.setItem("localCityHistory", JSON.stringify(searchBox.val()));
    onload();
}

function onload() {
    if (localStorage.getItem("localCityHistory")) {
        cityHistoryArray = JSON.parse(localStorage.getItem("localCityHistory"));

        for (let index = 0; index < cityHistoryArray.length; index++) {

        }
    }
}