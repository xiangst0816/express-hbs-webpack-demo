/**
 * faq cubeportfolio
 * */
import '../vendor/cubeportfolio/css/cubeportfolio.min.css'
import '../vendor/cubeportfolio/js/jquery.cubeportfolio.min.js'

export default function faq () {
  $('.js__grid-faq').cubeportfolio({
    filters: '.js__filters-faq',
    defaultFilter: '*',
    animationType: 'sequentially',
    gridAdjustment: 'default',
    displayType: 'default',
    caption: 'expand',
    gapHorizontal: 0,
    gapVertical: 0
  })
}
