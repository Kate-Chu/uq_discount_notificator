function priceProcessor (strPrice) {
  if (Number(strPrice)) return Number(strPrice)

  const invalidValue = {
    N: true,
    T: true,
    $: true,
    ',': true
  }

  for (const char of strPrice) {
    if (invalidValue[char]) {
      strPrice = strPrice.replace(char, '')
    }
  }

  return Number(strPrice)
}

module.exports = { priceProcessor }
