// common
import '../../app'
// page vendor
import map from '../../assets/js/map'
import swiper from '../../assets/js/swiper'
import counter from '../../assets/js/counter'
import parallax from '../../assets/js/parallax'
import wow from '../../assets/js/wow'
import magnificPopup from '../../assets/js/magnific-popup'
import portfolio3Col from '../../assets/js/portfolio-3-col'
// page style
import './style.less'

$(function () {
  // vendor
  map()
  swiper()
  counter()
  parallax()
  wow()
  magnificPopup()
  portfolio3Col()

  // page
  console.log('index')
})
