const puppeteer = require('puppeteer')
const { priceProcessor } = require('./price-processor')

function getProductName (data) {
  data.pop()
  data.shift()
  const name = data.join(' ')
  return name
}

const getProduct = async url => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36')
  await page.goto(url)
  await page.waitForSelector('.product-detail-list-title')
  await page.waitForSelector('.product-detail-list-price-main')
  await page.waitForSelector('.product-detail-list-price-right')

  const productData = await page.$eval('div[class="product-detail-list-title"]', e => e.textContent.split(' '))
  const category = productData[0]
  const uniqloId = Number(productData[productData.length - 1])
  const name = getProductName(productData)

  const img = await page.$eval('div[class="picture-viewer-picture"] > div > img[class="detail-img"]', img => img.getAttribute('src'))

  let currentPrice
  let soldOut
  if (await page.$eval('span[class="product-detail-list-price-main"]', e => e.textContent) === '已售罄') {
    currentPrice = 99999
    soldOut = true
  } else {
    currentPrice = await page.$eval('span[class="product-detail-list-price-main"] > span[class="h-currency bold"]', e => e.textContent)
    currentPrice = priceProcessor(currentPrice)
    soldOut = false
  }

  let originalPrice = await page.$eval('div[class="product-detail-list-price-right"] > span > span[class="h-currency bold"]', e => e.textContent)
  originalPrice = priceProcessor(originalPrice)

  const product = {
    category,
    name,
    uniqloId,
    currentPrice,
    originalPrice,
    url,
    img,
    soldOut
  }

  await browser.close()
  return product
}

module.exports = getProduct
