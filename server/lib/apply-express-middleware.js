
export default function applyExpressMiddleware (fn, req, res) {
  const originalEnd = res.end

  return new Promise((resolve, reject) => {
    res.end = function () {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, function () {
      resolve(true)
    })
  })
}
