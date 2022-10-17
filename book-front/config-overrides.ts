const path = require('path')
const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
  fixBabelImports,
} = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    'src': path.resolve(__dirname, 'src'),
  })
)