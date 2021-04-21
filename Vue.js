const { observer, Watcher } = require('./Observer')

function Vue(_op) {
  this.data = _op.data
  observer(this.data)
  _op.created()
  
}
