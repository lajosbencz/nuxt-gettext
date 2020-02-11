import Middleware from '../../middleware'
import options from './options'
import Cookie from 'cookie-universal'

const { namespace } = options
Middleware[namespace] = ({ route, app, req, res }) => {
    const cookies = new Cookie(req, res)
    const cookieLanguage = cookies.get(options.localeCookieKey)
    console.log({ cookieLanguage })
    if (cookieLanguage) {
        app.$language.current = cookieLanguage
    }
    // simply console logging here to demonstrate access to app context.
    console.log(namespace, 'middleware route', route.path)
    // console.log('Counter middleware store', store.state[namespace].count)
    // console.log('Counter middleware app', app[`$${namespace}`].value())
}
