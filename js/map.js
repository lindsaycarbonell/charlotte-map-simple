console.log("start");

var mymap;

window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kXY2UDygn1MSW3lgJwJkK62hJgaSXHGAkvti1zKnV8o/pubhtml';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: build,
                     simpleSheet: true } );
  }

  function build(data){
    console.log("sucessfully processed");
    console.log(data[0]);
    lats = [];
    longs = [];
    for (i in data){
      // console.log(data[i].lat);
    }
    var mapData = data;
    buildMap(mapData);
  }

// $.getJSON('assets/data.json', function(data){
//       landfillData = data;
//       console.log(data);
//       if (mymap == undefined){
//         buildMap(landfillData);
//       }
//     });



    function buildMap(mapData) {
      L.mapbox.accessToken = 'pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w';
      console.log("build map");

      mymap = L.map('mapid').setView([35.227087, -80.843127], 10);

      var places = mapData;
      var markers = [];

      L.tileLayer('https://api.mapbox.com/styles/v1/lindsaycarbonell/citevew8e00672hpbh8hg20af/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light'
    }).addTo(mymap);

    console.log(mymap);

    mymap.scrollWheelZoom.disable();

    console.log(places);

    for (var x in places){
      var thisMarker = L.marker([places[x].lat, places[x].long])
          .bindPopup("<h2>" + places[x].short_name + "</h2>")
          .openPopup();
      thisMarker.on('click', function(e){
        mymap.panTo([places[x].lat, places[x].long]);
      });
      console.log(thisMarker);
      markers.push(thisMarker);
      console.log("markers: " + markers);
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
