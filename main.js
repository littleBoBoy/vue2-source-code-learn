const observer = require('./Observer')

const library = {
  book1: null,
  book2: { name: '' }
}

observer(library)

library.book1 = { name: 'asdf' }
library.book2.name = '222222'
