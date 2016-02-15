import fs from 'fs'
import _debug from 'debug'
import config from './_base'


const debug = _debug('app:config')
debug('Create configuration')
debug(`Apply environment overrides for NODE_ENV "${config.env}".`)

const ovveridesFilename = `_${config.env}`
let hasOverridesFile
try {
  fs.lstatSync(`${__dirname}/${overridesFilename}.js`)
  hasOverridesFile = true
} catch (e) {}

let overrides
if (hasOverridesFile) {
  overrides = require(`./${overridesFilename}`)(config)
} else {
  debug(`No configuration overrides found for NODE_ENV "$config.env"`)
}

export default Object.assign({}, config, overrides)
