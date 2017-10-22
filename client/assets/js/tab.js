/**
 * tab cubeportfolio
 * */
import '../vendor/cubeportfolio/css/cubeportfolio.min.css'
import '../vendor/cubeportfolio/js/jquery.cubeportfolio.min.js'

export default function faq () {
  $('.js__grid-tabs').cubeportfolio({
    filters: '.js__filters-tabs',
    defaultFilter: '.-is-active',
    animationType: 'fadeOut',
    gridAdjustment: 'default',
    displayType: 'default',
    caption: ''
  })
}
