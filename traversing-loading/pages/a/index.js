Page({
  onTapButton () {
    my.showLoading({
      content: 'Loading from A',
    })
    my.scan({
      success () {
        my.hideLoading({ page: this })
        my.navigateTo({ url: '/pages/b/index' })
      },
    })
  },
})
