import { observer, Watcher, Dep } from './Observer.js'
function initData(vm, data, computed) {
  Object.keys(computed).forEach(key => {
    data[key] = null
  })
  vm.data = observer(data)
  Object.keys(vm.data).forEach(key => {
    Object.defineProperty(vm, key, {
      enumerable: false,
      configurable: true,
      get: function () {
        return vm.data[key]
      },
      set: function (newVal) {
        vm.data[key] = newVal
      }
    })
  })
}
function initMethods(vm, methods) {
  Object.keys(methods).forEach(key => {
    vm[key] = methods[key]
  })
}
function initComputed(vm, computed) {
  Object.keys(computed).forEach(key => {
    Dep.target = new Watcher(vm, null, () => {
      vm[key] = computed[key].bind(vm)()
    })
    vm[key] = computed[key].bind(vm)()
    Dep.target = null
  })
}
function initWatch(vm, watch) {
  Object.keys(watch).forEach(key => {
    new Watcher(vm, key, watch[key])
  })
}

function mount(vm, el) {
  const rootDom = document.querySelector(el)
  const regex = /{{2}.*?}{2}/g
  let sourceTemplate = rootDom.innerText
  for (const match of sourceTemplate.matchAll(regex)) {
    const key = match[0].slice(2, match[0].length - 2)
    rootDom.innerText = sourceTemplate.replaceAll(match[0], vm[key])
    new Watcher(vm, key, newVal => {
      rootDom.innerText = sourceTemplate.replace(match[0], newVal)
    })
  }
}
function Vue(options) {
  const {
    el,
    data = {},
    watch = {},
    computed = {},
    methods = {},
    created
  } = options
  const vm = this
  initMethods(vm, methods)
  initData(vm, data, computed)
  initComputed(vm, computed)
  initWatch(vm, watch)
  created && created.bind(vm)() //created 钩子函数
  el && mount(vm, el)
}

export default Vue
