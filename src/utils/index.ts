type PricesOrigin = 'aliexpress'

export function formatReturnPrice(price: string, origin?: PricesOrigin) {
  switch (origin) {
    case 'aliexpress':
      price = price.replace(/R\$/g, '').replace(/,/,'.').trim()
      if (price.match(/\..*\./)) {// check if there are 2 dots in the price
        return Number(price.replace('.', ''))
      } else {
        return Number(price)
      }
    default:
      return Number(price.replace(/R\$|\./g, '').replace(',','.').trim())
  }
}

export function normalizeText(text: string) {
  return text
    .normalize('NFD').toLocaleLowerCase().replace(/\s|-|\+|\.|,|[\u0300-\u036f]/g, '')
}