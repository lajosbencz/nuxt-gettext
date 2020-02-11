import Middleware from '../../middleware'
import options from './options'

Middleware[options.namespace] = function NuxtGettextMiddleware (...args) {
    console.log('[gettext middleware]')
}
