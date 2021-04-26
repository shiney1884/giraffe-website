// Initialize and add the map
function initMap() {
    // The location of Uluru
    const location = {
        lat: 56.459780,
        lng: -2.973840
    };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}