if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const productController = require('./controller/product-controller')

const execute = async () => {
  productController.addNewTrace()
  productController.deleteTrace()
  productController.searchAndCompare()
}

execute()
