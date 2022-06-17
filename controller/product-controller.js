const { traceList, newTrace, deleteTrace } = require('../trace')
const { Product } = require('../models')
const getProduct = require('../utlities/get-product')
const sendMail = require('../utlities/send-mail')

const productController = {
  // new trace
  addNewTrace: async () => {
    try {
      if (newTrace.length) {
        for (const item of newTrace) {
          const product = await getProduct(item.url)
          await Product.create(product)
        }
      }
    } catch (err) { console.log(err) }
  },

  // delete trace
  deleteTrace: async () => {
    try {
      if (deleteTrace.length) {
        for (const item of deleteTrace) {
          const product = await Product.findOne({ where: { url: item.url } })
          await product.destroy()
        }
      }
    } catch (err) { console.log(err) }
  },

  // search tracing, compare and notify
  searchAndCompare: async () => {
    try {
      const query = traceList.concat(newTrace)

      if (query.length) {
        const discountProduct = []
        for (const item of query) {
          const productOnline = await getProduct(item.url)
          const productDbRaw = await Product.findOne({ where: { uniqloId: productOnline.uniqloId } })
          const productDb = JSON.parse(JSON.stringify(productDbRaw))
          if (productOnline.currentPrice < productDb.currentPrice) {
            productOnline.lastPrice = productDb.currentPrice
            discountProduct.push(productOnline)
          }
          await productDbRaw.update(productOnline)
        }
        if (discountProduct.length) return sendMail(discountProduct)
        return console.log('目前追蹤商品沒有新折扣 ヾ(⌒(_´･ㅅ･`)_')
      }
    } catch (err) { console.log(err) }
  }
}

module.exports = productController
