import { initialize } from './app'

const reactRoot = window.document.getElementById('react-root')
initialize().then(({provider}) => {
  ReactDOM.render(provider, reactRoot)
})
