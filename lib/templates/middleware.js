
import Middleware from '../../middleware'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace } = options
Middleware[namespace] = ({ route, app }) => {
    const cookieLanguage = app.$cookies.get('_nuxt_gettext_locale')
    console.log({ cookieLanguage })
    if (cookieLanguage) {
        app.$language.current = cookieLanguage
    }
    // simply console logging here to demonstrate access to app context.
    console.log(namespace, 'middleware route', route.path)
    // console.log('Counter middleware store', store.state[namespace].count)
    // console.log('Counter middleware app', app[`$${namespace}`].value())
}
