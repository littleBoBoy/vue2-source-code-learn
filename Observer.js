function defineReactive(data, key, val) {
  observer(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      console.log(
        '监听到' +
          key +
          '由：' +
          JSON.stringify(val) +
          '更新为：' +
          JSON.stringify(newVal)
      )
      val = newVal
    }
  })
}

function observer(data) {
  if (!data || typeof data !== 'object') return
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

module.exports = observer
