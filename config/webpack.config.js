import webpack from 'webpack'
import cssnano from  'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import _debug from 'debug'
import config from '.'

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals

console.log("###### to blave")
debug('Configure ' + config.globals)
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'config.compiler_devtool',
  debug: true,
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.js', '.jsx', 'styl'],
  },
  alias: {
    storage: paths.client('utils', 'session-storage'),
    constants: paths.client('utils', 'constants')
  },
  module: {}
}

const APP_ENTRY_PATH = './src/root.js'


webpackConfig.entry = {
  app: __DEV__
  ? ['babel-polyfill', APP_ENTRY_PATH, hotMiddlewareScript]
  : [APP_ENTRY_PATH],
  vendor: config.compiler_vendor
}

webpackConfig.output = {
  filename: `[name].js`,
  path: ".",
  publicPath: "/"
}

webpackConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin("[name].css", { allChunks: true }),
  new HtmlWebpackPlugin({
    title: 'Lamarckian Dreams',
    filename: 'index.html',
    template: paths.client('templates', 'index.template.html')
  }),
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
  new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': 'react-dom',
    'connect': 'react-redux'
  })
]


if(__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Apply to Prod')
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

if(!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

webpackConfig.module.preloaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}]

webpackConfig.eslint = {
  configFile: paths.base('.eslintrc'),
  emitWarning: __DEV__
}

webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['babel-plugin-transform-runtime'],
    presets: __DEV__
      ? ['es2015', 'react', 'stage-0', 'react-hmre']
      : ['es2015', 'react', 'stage-0']
  }
},
{
  test: /\.json$/,
  loader: 'json'
}]

  webpackConfig.module.loaders.push({
    test: /\.styl$/,
    include: /src/,
    loaders: ['style', 'css', 'stylus']
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: /src/,
    loaders: ['style', 'css', 'postcss'
    ]
  })

  webpackConfig.postcss = [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      safe: true,
      discardComments: {
        removeAll: true
      }
    })
  ]

  // File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

if(!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter(loader =>
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
      const [first, ...rest] = loader.loaders
      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
      delete loader.loaders
    })

    webpackConfig.plugins.push(
      new ExtractTextPlugin('[name].[contenthash].css', {
        allChunks: true
      })
  )
}

export default webpackConfig
