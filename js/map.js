console.log("start");

var mymap;

window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kXY2UDygn1MSW3lgJwJkK62hJgaSXHGAkvti1zKnV8o/pubhtml';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: build,
                     simpleSheet: true } );
  }

  function build(mapData){
    console.log("sucessfully processed");
    console.log(mapData[0]);
    lats = [];
    longs = [];
    for (i in mapData){
      console.log(mapData[i].lat);
    }
    var mapData = mapData;
  }

$.getJSON('assets/data.json', function(data){
      landfillData = data;
      console.log(data);
      if (mymap == undefined){
        buildMap(landfillData);
      }
    });


    function buildMap(mapData) {
      console.log("build map");

      mymap = L.map('mapid').setView([35.227087, -80.843127], 5);


      // var landfills = data.BIGGEST;
      var places = mapData;
      // console.log(data.BIGGEST);
      var markers = [];

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light',
      zoom: 12,
      accessToken: 'pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w'
    })
    .addTo(mymap);


      L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8');



    mymap.scrollWheelZoom.disable();

    for (var x in places){
      var thisMarker = L.marker([places[x].lat, places[x].long])
          .bindPopup("<h2>" + places[x].short_name + "</h2>")
          .openPopup();
      thisMarker.on('click', function(e){
        mymap.panTo([places[x].lat, places[x].long]);
      });
      markers.push(thisMarker);
      markers[x].addTo(mymap);
    }

      /*add all the markers*/
      // for (var x in landfills){
      //   var thisMarker = L.marker([landfills[x].lat, landfills[x].long])
      //     .bindPopup("<h2>" + landfills[x].facility_name + " (" + landfills[x].county + " County)</h2>" + "<p class='popup-waste'>" + landfills[x].class1_disposed_string + " tons of Class 1 waste disposed</p>")
      //     .openPopup();
      //   thisMarker.on('click', function(e) {
      //     mymap.panTo([landfills[x].lat, landfills[x].long]);
      //   });
      //   markers.push(thisMarker);
      //   markers[x].addTo(mymap);
      //
      // }

    }
