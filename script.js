var formEl = $('#city-input');
var citylistEl = $('#city-list');
var cityInput = $('#city-input');
var addcity = $('#submit')
var apikey = "2100c07728dc7e42337fdff7d8652f7a"
var todayweather = document.getElementById('Today')
var Nextfour = document.getElementById('Nextfour')
var citypicked;



function submissionForm(event) {

    event.preventDefault();
    var citypicked = cityInput.val();
    console.log(citypicked);
    citylistEl.append("<button>" + citypicked);
    


    var coordinatesurl =  "https://api.openweathermap.org/geo/1.0/direct?q=" + citypicked + "&limit=1&appid=" + apikey;

    fetch(coordinatesurl, {
      method: "GET",
      credntials: 'same-orgin',
      redirect: 'follow',
    })
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      console.log(data);
      // create variables for lat and lon
      var coordinates ={
      lat : data[0].lat,
      // console.log(lat)
      lon : data[0].lon
      // console.log(lon)
      }
      localStorage.setItem('cities-picked', JSON.stringify(coordinates));

      var pulledcoordinates = localStorage.getItem('cities-picked');

      console.log(pulledcoordinates)


    })
}
  function weatherforcast(event){
    event.preventDefault()
    var city = event.target
    city = JSON.parse(window.localStorage.getItem("cities-picked"))||[]
    // console.log(city)
    console.log(city.lat)
    console.log(city.lon)

    dayapi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + city.lat + "&lon=" + city.lon + "&appid=" + apikey;

    fetch(dayapi, {
      method: "GET",
      credntials: 'same-orgin',
      redirect: 'follow',
    })
    
    .then(function (form) {
      return form.json();
    })
    .then(function (stuff){
      console.log(stuff);
        todayweather.innerHTML =
     `<div class="row">
     <div class="col s12 m6">
       <div class="card blue-grey darken-1">
         <div class="card-content white-text">
         <span class="card-title">${stuff.city.name}</span>
           <img src="https://openweathermap.org/img/w/${stuff.list[0].weather[0].icon}.png"/>
           <p>${dayjs.unix(stuff.list[0].dt).format("dddd, MMMM D, YYYY")}</p>
           <p><b>Temp:</b> ${stuff.list[0].main.temp}</p>
           <p>${stuff.list[0].main.humidity}</p>
           <p>${stuff.list[0].wind.speed}</p>
         </div>
       </div>
     </div>
   </div>`;

    Nextfour.innerHTML = 
    `<div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
        <img class="card-title" src="https://openweathermap.org/img/w/${stuff.list[8].weather[0].icon}.png"/>
        <p>${dayjs.unix(stuff.list[8].dt).format("dddd, MMMM D, YYYY")}</p>
        <p><b>Temp:</b> ${stuff.list[8].main.temp}</p>
        <p>${stuff.list[8].main.humidity}</p>
        <p>${stuff.list[8].wind.speed}</p>
        </div>
      </div>
    </div>
  </div> 
  <div class="row">
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
      <img class="card-title" src="https://openweathermap.org/img/w/${stuff.list[16].weather[0].icon}.png"/>
      <p>${dayjs.unix(stuff.list[16].dt).format("dddd, MMMM D, YYYY")}</p>
      <p><b>Temp:</b> ${stuff.list[16].main.temp}</p>
      <p>${stuff.list[16].main.humidity}</p>
      <p>${stuff.list[16].wind.speed}</p>
      </div>
    </div>
  </div>
</div>
<div class="row">
<div class="col s12 m6">
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
    <img class="card-title" src="https://openweathermap.org/img/w/${stuff.list[24].weather[0].icon}.png"/>
    <p>${dayjs.unix(stuff.list[24].dt).format("dddd, MMMM D, YYYY")}</p>
    <p><b>Temp:</b> ${stuff.list[24].main.temp}</p>
    <p>${stuff.list[24].main.humidity}</p>
    <p>${stuff.list[24].wind.speed}</p>
    </div>
  </div>
</div>
</div>
<div class="row">
<div class="col s12 m6">
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
    <img class="card-title" src="https://openweathermap.org/img/w/${stuff.list[32].weather[0].icon}.png"/>
    <p>${dayjs.unix(stuff.list[32].dt).format("dddd, MMMM D, YYYY")}</p>
    <p><b>Temp:</b> ${stuff.list[32].main.temp}</p>
    <p>${stuff.list[32].main.humidity}</p>
    <p>${stuff.list[32].wind.speed}</p>
    </div>
  </div>
</div>
</div>`

   
      })

      
    
    
    
    
    

  
  }



  

  


addcity.on("click", submissionForm)
citylistEl.on("click", weatherforcast)