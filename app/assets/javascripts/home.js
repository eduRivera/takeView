var x = document.getElementById("getPosition");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude+","+position.coords.longitude;
    var heading = 0
    for (i=1; i<=4; i++)
    {
        var img_url = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="
        +latlon+"&heading="+heading+"&pitch=-0.76&sensor=false";
        var ElementById = "streetView"+i
        document.getElementById(ElementById).innerHTML = "<img id='img"+i+"'name='img"+i+"'src='"+img_url+"'>";

        heading = heading + 100;
    }
  
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}