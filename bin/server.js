require('babel-register')

const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')

const port = config.default.server_port
const host = config.default.server_host


server.default.listen(port)
debug(`Server is now running at ${host}:${port}.`)
