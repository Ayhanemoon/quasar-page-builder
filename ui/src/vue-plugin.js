import QPageBuilder from './components/QPageBuilder.vue'
import mixinWidget from './mixin/Widgets'
import mixinOptionPanel from './mixin/OptionPanel'
import OptionPanelTabs from './components/OptionPanelComponents/OptionPanelTabs.vue'
import extractWidgets from './assets/extract.widgets'

<<<<<<< HEAD
const version = __UI_VERSION__
=======
import pkg from '../package.json'
const { version } = pkg
>>>>>>> f5d31bb604d339a737480794fde17936362721c2

function install (app) {
  app.component(QPageBuilder.name, QPageBuilder)

}

export {
  version,
  QPageBuilder,
  mixinWidget,
  mixinOptionPanel,
  OptionPanelTabs,
  extractWidgets,
  install
}
