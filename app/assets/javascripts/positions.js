$(document).ready(function(){
  var iteratorArray = 0;
  $.ajax({
    url: "/home/positions",
    dataType: 'json',
    success: function(data) {
      var result = data[0].url
      var result = result.split(',');
      initializeStreetView(result[0], result[1] );
      showPositionIntoMiniMap(result[0], result[1] );
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
  function showPositionIntoMiniMap(lat, lon) {
    var myOptions = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mini-map"),myOptions);
 
    var myLatlng = new google.maps.LatLng(lat,lon);
    var myLatlng2 = new google.maps.LatLng(41.539394, 2.112467);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map, 
    });
    var marker2 = new google.maps.Marker({
      position: myLatlng2, 
      map: map, 
    });
    //hacer que los puntos se unan con una linea roja
    var flightPlanCoordinates = [
    new google.maps.LatLng(lat,lon),
    new google.maps.LatLng(41.539394, 2.112467)
    ];
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
  
});



