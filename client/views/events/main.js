// common
import '../../app'
// page vendor
import swiper from '../../assets/js/swiper'
import wow from '../../assets/js/wow'
import magnificPopup from '../../assets/js/magnific-popup'
import parallax from '../../assets/js/parallax'
// page style
import './style.less'
import '../../assets/css/theme/red.css'

$(function () {
  // vendor
  swiper()
  parallax()
  wow()
  magnificPopup()

  // page
  console.log('events')
})

