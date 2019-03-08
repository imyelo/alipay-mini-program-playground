Page({
  onShow () {
    my.showLoading({
      content: 'Loading from C',
    })
    setTimeout(() => {
      my.hideLoading()
    }, 1000)
  },
})
