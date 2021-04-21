// const { observer, Watcher } = require('./Observer')

// // const library = {
// //   book1: null,
// //   book2: { name: '' }
// // }
// // observer(library)
// // new Watcher(library.book2, 'name', (vm, old, newVal) => {
// //   console.log(
// //     '我监听到了 哈哈哈哈' +
// //       'name' +
// //       '由：' +
// //       JSON.stringify(old) +
// //       '更新为：' +
// //       JSON.stringify(newVal)
// //   )
// // })
// // library.book2.name = 'asdfas'

// function selVue(data, el, exps) {
//   this.data = data
//   observer(this.data)
//   Object.keys(data).forEach(key => {
//     this.proxyKeys(key) //绑定代理属性
//   })
//   exps.forEach(exp => {
//     new Watcher(this, exp, (newVal, old) => {
//       console.log(
//         '我监听到了 哈哈哈哈' +
//           exp +
//           '由：' +
//           JSON.stringify(old) +
//           '更新为：' +
//           JSON.stringify(newVal)
//       )
//     })
//   })
// }
// selVue.prototype = {
//   proxyKeys: function (key) {
//     var self = this
//     Object.defineProperty(this, key, {
//       enumerable: false,
//       configurable: true,
//       get: function proxyGetter() {
//         return self.data[key]
//       },
//       set: function proxySetter(newVal) {
//         self.data[key] = newVal
//       }
//     })
//   }
// }

// const app = new selVue(
//   {
//     book1: null,
//     book2: { name: '', page: 1 }
//   },
//   null,
//   ['book1', 'book2', 'book2.name', 'book2.page']
// )
// // app.data.book1 = { name: 'js基础教程', page: 80 }
// app.book2.name = 'css揭秘'
// app.book2.page = 100
// app.book2 = { name: 'js基础教程', page: 80 }

const Vue = require('./Vue')
const app = new Vue({
  data: {
    name: '',
    age: 0,
    sex: '',
    stature: {
      weight: '',
      height: 0
    }
  },
  watch: {
    name(newVla, oldVal) {
      console.log('监听到name变化，由' + oldVal + '=>' + newVla)
    }
  },
  computed: {
    baseInfo() {
      return `我叫${this.name},${this.sex},今年${this.age}岁了。我的身高是${this.stature.weight}，体重是${this.stature.weight}`
    }
  },
  created() {
    console.log(this.baseInfo)
    this.name = '王章昊'
    this.age = 23
    this.sex = '男'
    this.formatData()
    this.stature.weight = '70kg'
    this.stature.height = '175cm'
    this.formatData()
  },
  methods: {
    formatData() {
      console.log(this.baseInfo)
    }
  }
})
