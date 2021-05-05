function initMap() {

    const location = {
        lat: 56.459780,
        lng: -2.973840
    };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location,
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}