/**
 * masonry grid
 * */
import '../vendor/masonry/imagesloaded.pkgd.min'
import '../vendor/masonry/jquery.masonry.pkgd.min'

export default function () {
  var n = $('.js__masonry')
  n.imagesLoaded(function () {
    n.masonry({
      itemSelector: '.js__masonry-item',
      columnWidth: '.js__masonry-sizer',
      percentPosition: !0
    })
  })

  $.fn.masonryImagesReveal = function (n) {
    var e = this.data('masonry')
    var t = e.options.itemSelector
    n.hide()
    this.append(n)
    n.imagesLoaded().progress(function (n, i) {
      var o = $(i.img).parents(t)
      o.show()
      e.appended(o)
    })
    return this
  }
}
