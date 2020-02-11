import Middleware from '../../middleware'
import options from './options'

const { namespace } = options
Middleware[namespace] = ({ app, req, res }) => {
    // const cookies = new Cookie(req, res)
    // const locale = cookies.get(options.localeCookieKey)
    // if (locale) {
    //     app.$language.current = locale
    // }
}
