import io from '@/libraries/io'

function LoadingMixin () {
  class Loading {
    constructor (page) {
      Object.defineProperty(this, 'page', {
        value: page?.$source,
      })
    }

    show (options) {
      try {
        return io.showLoading({
          page: this.page,
          ...options,
        })
      } catch (error) {
        return io.showLoading(options)
      }
    }

    hide (options) {
      try {
        return io.hideLoading({
          page: this.page,
          ...options,
        })
      } catch (error) {
        return io.hideLoading(options)
      }
    }
  }

  function onLoad () {
    this.$loading = new Loading(this)
  }

  return {
    onLoad,
  }
}

function LoadingComponentMixin () {
  return {
    created () {
      Object.defineProperty(this, '$loading', {
        get: () => this.$source?.$page?.__tina_instance__?.$loading,
      })
    },
  }
}

const LoadingPlugin = {
  install ({ Page, Component }) {
    Page.mixin(LoadingMixin)
    Component.mixin(LoadingComponentMixin)
  },
}

export default LoadingPlugin
