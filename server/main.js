import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import mount from 'koa-mount'
import _debug from 'debug'
import config from '../config'
import webpackDev from './middleware/webpack-dev'
import webpackHmr from './middleware/webpack-hmr'


const app = new Koa()
const paths = config.utils_paths
const debug = _debug('app:server')

app.use(convert(historyApiFallback({
  verbose: false
})))

const compiler = webpack(webpackConfig)

const { publicPath } = webpackConfig.output

debug(publicPath)

app.use(webpackDev(compiler, publicPath))
app.use(webpackHmr(compiler))

//app.use(convert(mount('/assets', serve(__dirname + '../assets'))))

//app.use(convert(serve(paths.client('static'))))

//app.use(convert(serve(paths.base(config.dir_dist))))

export default app
