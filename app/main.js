import F from 'fractal-js'
import R from 'ramda'
const h = F.h


let moduleDef = F.def({
  name: 'Main',
  init: ({key}) => ({
    key,
    isActive: false,
  }),
  inputs: {},
  actions: {
    Toggle: [[], m => R.evolve({isActive: R.not}, m)],
  },
  interfaces: {
    view: ({styles}, i, m) => h('div', { key: m.key, class: { [styles.base]: true } }, [
      h('div', {
        class: {
          [styles.button.base]: true,
          [styles.button.active]: m.isActive,
        },
        on: {
          click: i._action('Toggle'),
        },
      }, (m.isActive) ? 'nice!! :)' : 'Click me!!'),
    ]),
  },
  styles: {
    base: {
      ...F.style.absoluteCenter,
    },
    button: {
      base: {
        width: '280px',
        height: '70px',
        margin: '20px',
        fontSize: '38px',
        borderRadius: '35px',
        color: 'white',
        backgroundColor: '#13A513',
        textAlign: 'center',
        transition: 'transform 0.4s',
        cursor: 'pointer',
        ...F.style.absoluteCenter,
        ...F.style.noSelectable,
        '&:hover': {
          color: 'white',
          backgroundColor: 'purple',
          border: '3px solid purple',
          transform: 'perspective(1px) scale(1.1)',
        },
      },
      active: {
        color: 'purple',
        backgroundColor: '#FBFBFB',
        border: '3px solid #13A513',
      },
    },
  },
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
