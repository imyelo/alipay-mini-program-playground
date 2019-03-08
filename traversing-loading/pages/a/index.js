Page({
  onTapButton () {
    my.showLoading({
      content: 'Loading from A',
    })
    setTimeout(() => {
      my.hideLoading({
        page: this,
      })
      setTimeout(() => {
        my.navigateTo({ url: '/pages/b/index' })
      }, 100)
    }, 1000)
  },
})
