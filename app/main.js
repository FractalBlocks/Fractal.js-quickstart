const F = require('../../Fractal.js')
const R = require('ramda')
const h = F.h

module.exports = F.def({
  init: ({key}) => ({
    key,
    toggleState: true,
  }),
  inputs: {
    toggle: (ctx, Action, _) => Action.Toggle(_),
  },
  actions: {
    Toggle: [[R.T], (_, m) => R.evolve({toggleState: R.not}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', {
        style: {
          backgroundColor: (m.toggleState) ? 'purple' : 'green',
          width: '100px',
          height: '100px',
        },
        on: {
          click: i.toggle,
        },
      }),
    ]),
  },
})
