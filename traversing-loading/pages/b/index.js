Page({
  onLoad () {
    setTimeout(() => {
      my.showLoading({
        content: 'Loading from B',
      })
      setTimeout(() => {
        my.hideLoading()
      }, 1000)
    }, 0)
  },

  onTapButton () {
    my.navigateBack()
  },
})
