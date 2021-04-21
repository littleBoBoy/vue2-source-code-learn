function Observer(data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  },
  defineReactive: function (data, key, val) {
    this.walk(val)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        if (Dep.target) dep.addSub(Dep.target)
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        val = newVal
        dep.notify()
      }
    })
  }
}

function Dep() {
  this.subs = []
  this.target = null
}
Dep.prototype = {
  addSub: function (watcher) {
    this.subs.push(watcher)
  },
  notify: function () {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },
  run: function () {
    const oldVal = this.value
    const newVal = this._getValue()
    if (oldVal !== newVal) {
      this.value = newVal
      this.cb(this.vm, newVal, oldVal)
    }
  },
  get: function () {
    Dep.target = this
    const value = this._getValue()
    Dep.target = null
    return value
  },
  _getValue() {
    let keyChain = this.exp.split('.')
    const oData = keyChain.reduce((pre, key, index) => {
      if (index === keyChain.length - 1) return pre
      else return pre[key]
    }, this.vm.data)
    const key = keyChain[keyChain.length - 1]
    return oData[key]
  }
}

function observer(data) {
  return new Observer(data)
}

module.exports = {
  observer,
  Watcher
}
