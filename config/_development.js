// http: //stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server.port}/`
})
