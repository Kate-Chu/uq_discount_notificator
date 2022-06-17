if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PW
  }
})

const sendMail = products => {
  let mailContent = ''
  for (const product of products) {
    mailContent += `
    <h5>${product.name} 降價了！</h5>
    目前價格：${product.currentPrice}，前次價格：${product.lastPrice}，原價：${product.originalPrice}，
    去下單：${product.url}<br>
    `
  }

  mailTransport.sendMail(
    {
      from: `Amber Fragments <${process.env.GMAIL_USER}>`,
      to: `Amber Fragments <${process.env.GMAIL_USER}>`,
      subject: 'Uniqlo 商品降價了！',
      html: mailContent
    },
    err => {
      if (err) {
        console.log('Unable to send email: ' + err)
      }
    }
  )
  console.log('Sent a mail! ヽ(・×・´)ゞ')
}

module.exports = sendMail
