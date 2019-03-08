module.exports = {
  plugins: [
    require('precss')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-url')({ url: 'inline' }),
    require('postcss-px2units')({ multiple: 2, comment: 'NO_RPX' }),
  ],
}
