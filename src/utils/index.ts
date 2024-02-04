export const formatDate = (timestamp: number) => {
  return (
    Intl.DateTimeFormat('en-GB').format(timestamp * 1000) +
    '  ' +
    Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hour12: false,
      minute: 'numeric'
    }).format(timestamp * 1000)
  )
}

export const formatObjectDateNew = (item: string) => {
  const date = new Date(item)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    timeZone: 'UTC'
  }

  return new Intl.DateTimeFormat('en-GB', options)
    .format(date)
    .replace(/\//g, '.')
    .replace(/,/g, ' ')
}

export const formatObjectDate = (date: Date) => {
  return (
    Intl.DateTimeFormat('en-GB').format(date) +
    '  ' +
    Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hour12: false,
      minute: 'numeric'
    }).format(date)
  )
}

export const formatObjectNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

export const formatObjectCoin = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
  }).format(number)
}

export const formatObjectUSD = (number: number, usd: string) => {
  if (usd === 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number)
  } else if (usd === 'cus') {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(number)
  } else if (usd === 'percent') {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 6
    }).format(number)
  } else
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number)
}

export const toUppercaseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const formatObjectOnlyDate = (item: string) => {
  const date = new Date(item)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }
  return Intl.DateTimeFormat('en-GB', options).format(date).replace(/\//g, '.')
}

export const formatObjectOnlyTime = (item: string) => {
  const date = new Date(item)
  const options: Intl.DateTimeFormatOptions = {
    day: undefined,
    month: undefined,
    year: undefined,
    hour: 'numeric',
    hour12: false,
    minute: 'numeric'
  }
  return Intl.DateTimeFormat('en-GB', options).format(date)
}

export const formatTime = (date: string) => {
  return Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hour12: false,
    minute: 'numeric'
  }).format(new Date(date))
}

export const formatBigNums = (number: number) => {
  const num = number.toString()

  const floorNum = num.toString().split('.')[0]

  let wholePath = floorNum.length % 3
  let stringPath = (floorNum.length - wholePath) / 3

  if (wholePath === 0 && stringPath > 1) {
    wholePath = 3
    stringPath -= 1
  }
  if (wholePath === 0 && stringPath === 1) stringPath = 0

  switch (stringPath) {
    case 0: {
      return num
    }
    case 1: {
      return num.slice(0, wholePath) + ' ' + 'k'
    }
    case 2: {
      return num.slice(0, wholePath) + ' ' + 'M'
    }
    case 3: {
      return num.slice(0, wholePath) + ' ' + 'B'
    }
    case 4: {
      return num.slice(0, wholePath) + ' ' + 'T'
    }
    case 5: {
      return num.slice(0, wholePath) + ' ' + 'qd'
    }
    case 6: {
      return num.slice(0, wholePath) + ' ' + 'Qn'
    }
    case 7: {
      return num.slice(0, wholePath) + ' ' + 'sx'
    }
    case 8: {
      return num.slice(0, wholePath) + ' ' + 'Sp'
    }
    case 9: {
      return num.slice(0, wholePath) + ' ' + 'O'
    }
    case 10: {
      return num.slice(0, wholePath) + ' ' + 'N'
    }
  }
  return 0
}

export const shortAddress = (str: string, start = 6, end = start - 2) => {
  return str.slice(0, start) + '...' + str.slice(-end)
}

export const toReduction = (price: number) => (price < 1 ? price.toPrecision(2) : price.toFixed(2))

export const toPriceView = (price: number) =>
  `${price}`
    .split('')
    .reverse()
    .map((el, index) => (index % 3 !== 2 ? el : ` ${el}`))
    .reverse()
    .join('')

export const nowInSeconds = () => Math.floor(Date.now() / 1000)

export const getCurrentDateFormatted = () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  }

  return new Intl.DateTimeFormat('en-GB', options).format(date).replace(/\//g, '.')
}

export const digitsReplace = (str: string) =>
  str.replace(/[^.\d]+/g, '').replace(/^([^\.]*\.)|\./g, '$1')
