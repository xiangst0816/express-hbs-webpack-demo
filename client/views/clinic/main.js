// common
import '../../app'
// page vendor
import swiper from '../../assets/js/swiper'
import wow from '../../assets/js/wow'
import parallax from '../../assets/js/parallax'
import equalHeight from '../../assets/js/equal-height'
import masonry from '../../assets/js/masonry'
// page style
import './style.less'

$(function () {
  // vendor
  swiper()
  parallax()
  wow()
  equalHeight()
  masonry()

  // page
  console.log('clinic')
})
