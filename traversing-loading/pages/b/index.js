Page({
  onLoad () {
    my.showLoading({
      content: 'Loading from B',
    })
    setTimeout(() => {
      my.hideLoading()
    }, 1000)
  },

  onTapButton () {
    my.navigateBack()
  },
})
