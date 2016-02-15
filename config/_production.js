export default (config) => ({
  compiler_fail_warning  :  false,
  compiler_hash_type     :  'chunkhash',
  compiler_devtool       :  null,
  compiler_stats         : {
    chunks  : true,
    chunkModules : true,
    colors  : true
  }
})
