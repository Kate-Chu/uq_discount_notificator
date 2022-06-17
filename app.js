if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const productController = require('./controller/product-controller')

const execute = async () => {
  await productController.addNewTrace()
  await productController.deleteTrace()
  await productController.searchAndCompare()
}

execute()

module.exports = execute
