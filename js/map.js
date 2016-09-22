console.log("start");

var mymap;

$.getJSON('assets/data.json', function(data){
      landfillData = data;
      console.log(data);
      if (mymap == undefined){
        buildMap(landfillData);
      }
    });


    function buildMap(data) {
      console.log("build map");

      mymap = L.map('mapid').setView([35.227087, -80.843127], 5);


      var landfills = data.BIGGEST;
      // console.log(data.BIGGEST);
      var markers = [];

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light',
      maxZoom: 9,
      minZoom: 4,
      accessToken: 'pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w'
    }).addTo(mymap);

    mymap.scrollWheelZoom.disable();

      /*add all the markers*/
      for (var x in landfills){
        // console.log(landfills[x]);
        var thisMarker = L.marker([landfills[x].lat, landfills[x].long])
          .bindPopup("<h2>" + landfills[x].facility_name + " (" + landfills[x].county + " County)</h2>" + "<p class='popup-waste'>" + landfills[x].class1_disposed_string + " tons of Class 1 waste disposed</p>")
          .openPopup();
        thisMarker.on('click', function(e) {
          mymap.panTo([landfills[x].lat, landfills[x].long]);
        });
        markers.push(thisMarker);
        // console.log(markers[0].getLatLng());
        markers[x].addTo(mymap);

      }

    }
