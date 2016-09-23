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
    // console.log("sucessfully processed");
    // console.log(data[0]);
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

var isMobile;

$(window).resize(function() {
      // console.log("RESIZE");

      var width = $(window).width();
      if (tempWidth !== width) {
        if (width <= 840) {
          isMobile = true;
        } else {
          isMobile = false;
        }
      }

      tempWidth = width;

    });



    function buildMap(mapData) {
      // L.mapbox.accessToken = 'pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w';
      // console.log("build map");

      mymap = L.map('mapid').setView([35.227087, -80.843127], 13);
      //THE ZOOM IS SET UP HERE DUMMY

      var places = mapData;
      var markers = [];

      L.tileLayer('https://api.mapbox.com/styles/v1/lindsaycarbonell/citeusxid006x2ip17zp0ed55/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZHNheWNhcmJvbmVsbCIsImEiOiJjaXRlajNhd2cwNjBkMzJvOW04OWQ0dm5xIn0.GGAg70cv_JpPUXxFvkdY-w').addTo(mymap);

    // console.log(mymap);


    mymap.scrollWheelZoom.disable();

    // console.log(places);

    for (var x in places){


      var thisIcon = L.icon({
      iconUrl: 'assets/' + places[x].icon,
      iconSize:     [38, 38], // size of the icon
      iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

      });
      var thisMarker = L.marker([places[x].lat, places[x].long], {icon: thisIcon});

      if (!isMobile){

        thisMarker.on('click', function(e){

             mymap.panTo(e.latlng);
             mymap.setView(e.latlng, 13); //FIX THIS
            //  console.log("I panned");
            // console.log(places[x]);

            //this exists because I needed something to compare and yeah
            for (var x in places){
              var lat_long = {
                lat: places[x].lat,
                lng: places[x].long
              }

              console.log(lat_long.lat == e.latlng.lat);
              if (lat_long.lat == e.latlng.lat){
                changeSidebar(places[x]);
              }
            }


           });

           markers.push(thisMarker);
          // console.log("marker pushed");
          // console.log(thisMarker);
          // console.log(markers);
           markers[x].addTo(mymap);
          //  console.log("marker added");


        }
      } //window width


     } //buildMap

     //DO THIS
     function changeSidebar(thisPlace){
       console.log("change sidebar");
       for (x in thisPlace){
        //  $(".side-title").update(thisPlace[x]);
        console.log(thisPlace.short_name);

         document.getElementById('side-title').innerHTML = thisPlace.short_name;

         document.getElementById('side-content').innerHTML = thisPlace.description;

         document.getElementById('side-image-box').innerHTML = '<img class="side-image" src="assets/' + thisPlace.image_url + '" />';


       }





     }


       // if (places[x].icon == "map_damage.png"){
       //
       // } else if (places[x].icon == "map_scott.png"){
       //
       // } else if (places[x].icon == "map_shots-fired.png"){
       //
       // } else if (places[x].icon == "map_past-protests.png"){
       //
       // } else if (places[x].icon == "map_hospital.png"){
       //
       // }


     // for (var x in places){
     //   if ()
     //
     //   var thisMarker = L.marker([places[x].lat, places[x].long])
     //       .bindPopup("<h2>" + places[x].short_name + "</h2>")
     //       .openPopup();
     //   thisMarker.on('click', function(e){
     //     mymap.panTo([places[x].lat, places[x].long]);
     //   });
     //   console.log(thisMarker);
     //   markers.push(thisMarker);
     //   console.log("markers: " + markers);
     //   markers[x].addTo(mymap);
     // }



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
