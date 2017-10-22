/**
 * WOW plugin init
 * */
import { WOW } from 'wowjs'

export default function () {
  var wow = new WOW({mobile: !1})
  wow.init()
}
