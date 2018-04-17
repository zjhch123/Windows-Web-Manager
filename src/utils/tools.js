export function flatArray(array) {
  return [].concat(...array)
}

export function formatNumber(number, fixed = 1) {
  return Number(number).toFixed(fixed)
}

const formatInteger = (integer) => {
  return '' + ('0' + integer).slice(-2)
}

export function formatTime(timestamp) {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${formatInteger(date.getMonth() + 1)}-${formatInteger(date.getDate())} ${formatInteger(date.getHours())}:${formatInteger(date.getMinutes())}:${formatInteger(date.getSeconds())}`
}

export function formatDateTime(timestamp) {
  timestamp = ~~(timestamp / 1000)
  const day = ~~(timestamp / 60 / 60 / 24)
  const hour = ~~((timestamp -  60 * 60 * 24 * day) / 60 / 60)
  const minuts = ~~((timestamp -  60 * 60 * 24 * day -  60 * 60 * hour) / 60)
  const second = ~~((timestamp -  60 * 60 * 24 * day -  60 * 60 * hour -  60 * minuts))
  return `${day}天${hour}小时${minuts}分${second}秒`
}