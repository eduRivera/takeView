$(document).ready(function(){
  var iteratorArray = 0;
  $.ajax({
    url: "/home/positions",
    dataType: 'json',
    success: function(data) {
      var result = data[0].url
      var result = result.split(',');
      initializeStreetView(result[0], result[1] );
      showPositionIntoMiniMap(data);
    },
    error: function() {
      console.log("No entra");
    }
  });

  $("button").click(function(){
    $.ajax({
      url: "/home/positions",
      dataType: 'json',
      success: function(data) {
        if (data.length == iteratorArray +1){
          iteratorArray = 0;
        }else{
          iteratorArray = iteratorArray +1; 
        }
        var result = data[iteratorArray].url;
        var result = result.split(',');
        initializeStreetView(result[0], result[1] );
      },
      error: function() {
        console.log("No entra");
      }
   });
  });
  function showPositionIntoMiniMap(data) {
    var coord = data[0].url
    coord = coord.split(',');
    var lat = coord[0];
    var lon = coord[1];
    var myOptions = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("mini-map"),myOptions);
    var flightPlanCoordinates = new Array;
    for ( var i = 0 ; i < data.length ; i++){
       var coord = data[i].url
       coord = coord.split(',');
       var lat = coord[0];
       var lon = coord[1];
       var LatLng = new google.maps.LatLng(lat,lon);
       var LatLng  = new google.maps.Marker({
       position: LatLng ,
       map: map, 
       });
       flightPlanCoordinates.push(new google.maps.LatLng(lat,lon));

    }
    //hacer que los puntos se unan con una linea roja
        var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    }); 
    flightPath.setMap(map);
    //hacer mas grande el contenedor del mini mapa cuando pasemos el raton por encima
    var miniMap = document.getElementById('mini-map');
    google.maps.event.addListener(map, 'mouseover', function() {
      miniMap.style['width'] = '300px';
      miniMap.style['height'] = '200px';
              
    });
    google.maps.event.addListener(map, 'mouseout', function() {
      miniMap.style['width'] = '180px';
      miniMap.style['height'] = '80px';
    });
  }

  function initializeStreetView(lat, lon) {
    var bryantPark = new google.maps.LatLng(lat, lon);
    var panoramaOptions = {
      position: bryantPark,
      pov: {
        heading: 165,
        pitch: 0
      },
      zoom: 1
    };
    var myPano = new google.maps.StreetViewPanorama(document.getElementById('map-canvas'),panoramaOptions);
    myPano.setVisible(true);
  }

  //si cliquem els icones siluminara la drop box
  
});

//funcions pel drag an drop
  function allowDrop(ev) {
    ev.preventDefault();
   
  }

  function drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
      var dropBox = document.getElementById('dropBox');
      dropBox.classList.add('drop-box-active');
  }
  function dragstop(ev) {
      alert("hola");
  }

  function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("Text");
      ev.target.appendChild(document.getElementById(data));
      var dropBox = document.getElementById('dropBox');
      dropBox.classList.remove('drop-box-active');
      dropBox.classList.add('drop-box');
  }
  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      var dropBox = document.getElementById('dropBox');
      dropBox.classList.remove('drop-box-active');
      dropBox.classList.add('drop-box');
  }, false);


