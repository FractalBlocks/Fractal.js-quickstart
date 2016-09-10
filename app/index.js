require('./styles.css')
const F = require('fractal-js')


let engine = F.run({
  root: F.log(require('./main')), // F.log is for debugging
  drivers: {
    view: F.drivers.view('#app'),
  },
})


// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./main', (comp) => {
    // Mutate the variable holding our component
    let module = require('./main')
    engine.reattach(module)
  })
}

