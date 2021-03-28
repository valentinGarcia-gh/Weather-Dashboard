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

    let pos = 0;
    let inputStorage = searchBox.val();
    localStorage.setItem(pos, inputStorage);
    pos++;
    console.log("push me again");

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

            $(".cityHeader").html("<h1>" + searchBox.val() + " " + "(" + dateTime + ")" + "</h1>").addClass("cityHeader");
            $(".temperature").html("<p>Temperature: " + temperature + "</p>");
            $(".humidity").html("<p>Humidity: " + humidity + "</p>");
            $(".windSpeed").html("<p>Wind Speed: " + windSpeed + "</p>");
            $(".uvIndex").html("<p>UV Index: " + uvIndex + "</p>");
            $("img").attr("src", iconURL);
        });
    });
}
