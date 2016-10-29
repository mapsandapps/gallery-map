var map = L.map('map').setView([33.7530, -84.3984], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(map);

omnivore.csv('photos.csv')
.on('ready', function(layer) {
  this.eachLayer(function(marker) {
    marker
      .on({
        click: markerClicked
      })
      .setIcon(L.icon({
        iconUrl: marker.feature.properties.filename,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        className: 'photo-icon'
      }))
      .addTo(map);
  })
});

function markerClicked(e) {
  var properties = e.target.feature.properties;
  document.querySelector('#photo').classList.remove('hidden');
  document.querySelector('#image').style.backgroundImage = "url('" + properties.filename + "')";
  document.querySelector('#caption').innerHTML = properties.caption;
}
