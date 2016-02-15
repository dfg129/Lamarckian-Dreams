import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:config:_base')
const config = {
  env: [process.env.NODE_ENV || 'development'],

  path_base  : path.resolve(__dirname, '../'),
  dir_client : 'src',
  dir_build  : 'build',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  server_host : 'localhost',
  server_port : 3030,

  compiler_css_modules      : true,
  compiler_devtool          : 'source-map',
  compiler_hash_type        : 'hash',
  compiler_fail_on_warning  : false,
  compiler_quiet            : false,
  compiler_public_path      : '/',
  compiler_stats            : {
    chunks: false,
    chunkModules: false,
    colors : true
  },

  compiler_vendor : [
    'history',
    'react',
    'react-redux',
    'react-router',
    'redux',
    'redux-router',
    'redux-thunk'
  ],

  coverage_enabled    :  !argv.watch,
  coverage_reporters  : [
    { type  :  'text-summary' },
    { type  :  'html', dir : 'coverage' }
  ]
}

// Environment

config.globals = {
  'process.env' : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'    : config.env,
  '__DEV__'     : config.env == 'development',
  '__PROD__'    : config.env == 'production',
  '__TEST__'    : config.env == 'test',
  '__DEBUG__'   : config.env == 'development' && !argv.no_debug,
  '__DEBUG_NEW_WINDOW__' : !!argv.nw,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies[dep]) return true

    debug(
        `Package "${dep}" was not found as an npm dependency in package.json; ` +
        `it won't be included in the webpack vendor bundle.\n` +
        `Consider removing it from vendor_dependencies in ~/config/index.js`
      )
  })

config.utils_paths = (() => {
    const resolve = path.resolve

    const base = (...args) =>
      resolve.apply(resolve, [config.path_base, ...args])

    return {
      base : base,
      client : base.bind(null, config.dir_client),
      build  : base.bind(null, config.dir_build),
      dist   : base.bind(null, config.dir_dist)
    }
  })()

export default config
