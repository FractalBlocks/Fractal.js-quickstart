const F = require('fractal-js')
const R = require('ramda')
const h = F.h

module.exports = F.def({
  init: ({key}) => ({
    key,
    isActive: false,
  }),
  inputs: {
    toggle: (ctx, Action, _) => Action.Toggle(_),
  },
  actions: {
    Toggle: [[R.T], (_, m) => R.evolve({isActive: R.not}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', { key: m.key, class: { [styles.base]: true } }, [
      h('div', {
        class: {
          [styles.button.base]: true,
          [styles.button.active]: m.isActive,
        },
        on: {
          click: i.toggle,
        },
      }),
    ]),
  },
})

let styles = F.css.rs({
  base: {},
  button: {
    base: {
      backgroundColor: 'purple',
      width: '100px',
      height: '100px',
    },
    active: {
      backgroundColor: 'green',
    },
  },
})
