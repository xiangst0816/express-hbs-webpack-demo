// common
import 'app'
// page vendor
import parallax from '../../assets/js/parallax'
import faq from '../../assets/js/faq'
// page style
import './style.less'

$(function () {
  // vendor
  parallax()
  faq()

  // page
  console.log('faq')
})
