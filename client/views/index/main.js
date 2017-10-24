// common
import 'app'
// page vendor
import swiper from '../../assets/js/swiper'
import counter from '../../assets/js/counter'
import parallax from '../../assets/js/parallax'
import wow from '../../assets/js/wow'
import magnificPopup from '../../assets/js/magnific-popup'
import portfolio3Col from '../../assets/js/portfolio-3-col'
// page style
import './style.less'

import L from 'leaflet'

$(function () {
  // vendor
  swiper()
  counter()
  parallax()
  wow()
  magnificPopup()
  portfolio3Col()

  initMap()

  // page
  console.log('index')
  console.log('index')
})

function initMap () {
  /**
   * init leaflet map
   * */
  let center = [51.507406923983446, -0.1277589797973633] // London
  var mymap = L.map('js__map-container', {
    scrollWheelZoom: false
  }).setView(center, 13)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap)
  L.marker(center, {
    icon: L.icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      iconAnchor: [12, 41], // size: 25 41
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }).addTo(mymap)
}