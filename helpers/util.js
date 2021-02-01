/**
 * Output time (eg. 1d, 6mo, 1yr) into object for easier representation,
 * 
 * @param {String} timeframe 
 */
module.exports.timeParser = (timeframe) => {
  let obj = {
    unit: '',
    amount: parseInt(timeframe.match(/[0-9]+/)[0]),
    every: ''
  }

  /* eslint-disable indent */
  switch (timeframe.split(/[0-9]+/)[1]) {
    case 'year':
    case 'yr':
    case 'y':
      obj.unit = 'year'
      break

    case 'month':
    case 'mo':
    case 'm':
      obj.unit = 'month'
      break

    case 'week':
    case 'w':
      obj.unit = 'day'
      obj.amount = obj.amount * 7
      break

    case 'day':
    case 'd':
      obj.unit = 'day'
      break

    default:
      obj.unit = 'invalid'
      break
  }

  if (obj.amount > 1) {
    obj.every = `every ${obj.amount} ${obj.unit}s`
  } else {
    obj.every = `every ${obj.unit}`
  }

  return obj
}

/**
 * Capitalize first letter of string
 * 
 * @param {String} s 
 */
module.exports.cap = (s) => s.toUpperCase()[0] + s.substr(1)