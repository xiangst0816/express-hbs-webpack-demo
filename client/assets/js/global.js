/**
 * global plugin init
 * */
export default function () {
  /**
   * js center aligined
   * */
  var jsCenterAligined = function () {
    $('.js__ver-center-aligned').each(function () {
      $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2)
    })

    $(window).resize(function () {
      $('.js__ver-center-aligned').each(function () {
        $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2)
      })
    })
  }

  /**
   * convert img[hrec] value to background-image attr
   * */
  var convertImgToBgImg = function () {
    $('.js__fullwidth-img').each(function () {
      $(this).css('background-image', 'url(' + $(this).children('img').attr('src') + ')')
      $(this).children('img').hide()
    })
  }

  /**
   * control right top menus open and close
   * */
  var menu = function () {
    var $bgOverlayElement = $('.js__bg-overlay')
    var $headerOverlayElement = $('.js__header-overlay')
    var $triggerElement = $('.js__trigger')
    $triggerElement.on('click', function () {
      $bgOverlayElement.toggleClass('-is-open')
      $headerOverlayElement.toggleClass('-is-open')
      $triggerElement.toggleClass('-is-active')
    })
  }

  /**
   * back to top
   * */
  var backToTop = function () {
    var minTop = 300
    var maxTop = 1200
    var duration = 700
    var $backToTopElement = $('.js__back-to-top')
    var $window = $(window)

    $window.scroll(function () {
      if ($window.scrollTop() > minTop) {
        $backToTopElement.addClass('-is-visible')
      } else {
        $backToTopElement.removeClass('-is-visible -zoom-out')
        if ($window.scrollTop() > maxTop) {
          $backToTopElement.addClass('-zoom-out')
        }
      }
    })

    $backToTopElement.on('click', function (event) {
      event.preventDefault()
      $('body,html').animate({scrollTop: 0}, duration)
    })
  }

  /**
   * header sticky
   * 控制header是否到了顶部, 进行状态切换
   * */
  var headerSticky = function () {
    var $headerStickyElement = $('.js__header-sticky')
    var stickyClassName = 's-header__shrink'
    if ($headerStickyElement.offset().top > 15) {
      $headerStickyElement.addClass(stickyClassName)
    }

    $(window).scroll(function () {
      if ($headerStickyElement.offset().top > 15) {
        $headerStickyElement.addClass(stickyClassName)
      } else {
        $headerStickyElement.removeClass(stickyClassName)
      }
    })
  }

  /**
   * controll a tag to right equal id location smoothly
   * */
  var smoothScroll = function () {
    $('a[href*="#js__scroll-to-"]:not([href="#js__scroll-to-"])').on('click', function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var $hashElement = $(this.hash)

        if (!$hashElement.length) {
          $hashElement = $('[name=' + this.hash.slice(1) + ']')
        }

        if ($hashElement.length) {
          $('html,body').animate({
            scrollTop: $hashElement.offset().top - 90
          }, 1000)
        }
      }
    })
  }

  var init = function () {
    jsCenterAligined()
    convertImgToBgImg()
    menu()
    backToTop()
    headerSticky()
    smoothScroll()
  }

  init()
}
