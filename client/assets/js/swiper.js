/* eslint-disable no-new */
/**
 * init Swiper
 * */
import Swiper from 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.min.css'

export default function () {
  // index
  new Swiper('.js__swiper-one-item', {
    navigation: {
      nextEl: '.js__swiper-btn--next',
      prevEl: '.js__swiper-btn--prev'
    },
    speed: 1e3,
    autoplay: 7e3,
    loop: !0
  })
  // clinic
  new Swiper('.js__swiper-slider', {
    pagination: {
      el: '.js__swiper-pagination',
      clickable: true
    },
    speed: 1e3,
    autoplay: 7e3,
    loop: !0
  })
  new Swiper('.js__swiper-clients', {
    slidesPerView: 5,
    spaceBetween: 50,
    loop: !0,
    breakpoints: {
      1024: {slidesPerView: 4, spaceBetween: 50},
      992: {slidesPerView: 3, spaceBetween: 40},
      768: {slidesPerView: 3, spaceBetween: 30},
      600: {slidesPerView: 2, spaceBetween: 30},
      480: {slidesPerView: 2, spaceBetween: 0}
    }
  })
  new Swiper('.js__swiper-news', {
    pagination: {
      el: '.js__swiper-pagination',
      clickable: true
    },
    slidesPerView: 4,
    spaceBetween: 30,
    loop: !0,
    breakpoints: {
      1024: {slidesPerView: 4, spaceBetween: 30},
      992: {slidesPerView: 3, spaceBetween: 30},
      768: {slidesPerView: 2, spaceBetween: 30},
      600: {slidesPerView: 2, spaceBetween: 30},
      480: {slidesPerView: 1, spaceBetween: 0}
    }
  })
  new Swiper('.js__swiper-testimonials', {
    pagination: {
      el: '.js__swiper-fraction',
      type: 'fraction',
      clickable: true
    },
    navigation: {
      nextEl: '.js__swiper-btn--next',
      prevEl: '.js__swiper-btn--prev'
    },
    slidesPerView: 1,
    speed: 1e3,
    autoplay: 7e3,
    loop: !0
  })
}
