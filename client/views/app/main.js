// common
import 'app'
// page vendor
import swiper from '../../assets/js/swiper'
import wow from '../../assets/js/wow'
import portfolio4Col from '../../assets/js/portfolio-4-col'
import '../../assets/vendor/vidbg.min'
// page style
import './style.less'

$(function () {
  // vendor
  swiper()
  portfolio4Col()
  wow()
  // page
  console.log('app')
})
