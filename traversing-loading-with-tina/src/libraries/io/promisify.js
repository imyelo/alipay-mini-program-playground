export default function promisify (api) {
  return (options = {}) => new Promise((resolve, reject) => {
    api({
      ...options,
      success (...fulfilled) {
        resolve(...fulfilled)
      },
      fail (error) {
        if (error instanceof Error) {
          return reject(error)
        }
        if (typeof error === 'string') {
          return reject(new Error(error))
        }

        let err = new Error(error?.errMsg || error?.errorMessage)
        // error code defined by alipay mini program
        if (error?.error) {
          err.code = error.error
        }
        err.raw  = error
        reject(err)
      },
    })
  })
}
