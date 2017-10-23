// common
import 'app'
// page vendor
import swiper from '../../assets/js/swiper'
import counter from '../../assets/js/counter'
import parallax from '../../assets/js/parallax'
import wow from '../../assets/js/wow'
import magnificPopup from '../../assets/js/magnific-popup'
import tab from '../../assets/js/tab'
import equalHeight from '../../assets/js/equal-height'
// page style
import './style.less'
import '../../assets/css/theme/gold.css'

$(function () {
  // vendor
  swiper()
  counter()
  parallax()
  wow()
  magnificPopup()
  tab()
  equalHeight()

  // page
  console.log('lawyer')
})
