
const map = L.map('map-template').setView([-33.4153477, -70.6041191], 13);

const socket = io();

const titleURL = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

L.tileLayer(titleURL).addTo(map);

map.locate({enableHighAccuracy: true})
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng]
    const marker = L.marker(coords);
    marker.bindPopup('Marico el que lo lea!');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng)
});

socket.on('newUserCoordinates', (coords) => {
    const marker = L.marker([coords.lat, coords.lng]);
    marker.bindPopup('Hello there!');
    map.addLayer(marker);
});

const marker = L.marker([51.505, -0.09]);
marker.bindPopup('Hello there!');
map.addLayer(marker);