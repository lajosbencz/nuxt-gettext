import Component from '../templates/component'
import options from '../templates/options'
import translate from '../templates/translate'
import interpolate from '../templates/interpolate'
import Vue from 'vue'
import Cookie from 'cookie-universal'
import serverLocale from 'accept-language-parser'
import { getUserLocales as clientLocale } from 'get-user-locale'

import '../templates/middleware'

Vue.component('translate', Component)
// if (!Object.prototype.hasOwnProperty.call(Vue.prototype, '$gettext')) {
//     Object.defineProperties(Vue.prototype, {
//         $gettext: {
//             get () {
//                 return (msgid) => {
//                     if (!this._gettextShouldRetranslate) {
//                         console.log('prepare force update')
//                         Vue.nextTick(() => {
//                             console.log('force update')
//                             this.$forceUpdate()
//                             this._gettextShouldRetranslate = false
//                         })
//                     }
//                     this._gettextShouldRetranslate = true
//                     return translate.gettext(msgid)
//                 }
//             }
//         }
//     })
// }
Vue.prototype.$gettext = translate.gettext.bind(translate)
Vue.prototype.$pgettext = translate.pgettext.bind(translate)
Vue.prototype.$ngettext = translate.ngettext.bind(translate)
Vue.prototype.$npgettext = translate.npgettext.bind(translate)
Vue.prototype.$gettextInterpolate = interpolate.bind(interpolate)

const NuxtGettextPlugin = function ({ app, req, res, beforeNuxtRender, nuxtState }, inject) {
    let cookies
    if (process.client) {
        cookies = Cookie()
    } else {
        cookies = Cookie(req, res)
    }

    const supportedLocales = Object.keys(options.availableLanguages)
    let locale = cookies.get(options.localeCookieKey)
    if (!locale) {
        if (process.server) {
            locale = serverLocale.pick(supportedLocales, req.headers['accept-language'])
        } else {
            const clientLocales = clientLocale()
            for (const l of clientLocales) {
                if (supportedLocales.includes(l)) {
                    locale = l
                    break
                }
            }
        }
    }
    if (!locale) {
        locale = options.defaultLanguage
    }

    translate.translations = {}
    if (process.server) {
        beforeNuxtRender(({ nuxtState }) => {
            let translations = {}
            try {
                translations = require('~/locale/' + locale + '.json')
            } catch (e) {
                console.error(e)
            }
            nuxtState.translations = {
                [locale]: translations
            }
        })
    } else {
        translate.translations = nuxtState.translations
    }

    const languageVm = new Vue({
        mixins: [options.languageVmMixin],
        data () {
            return {
                // set this
                current: locale,
                // this is set after the translations arrived, computed translations are synchronized via this
                asyncCurrent: ''
            }
        },
        watch: {
            async current (newLocale) {
                cookies.set(options.localeCookieKey, newLocale)
                await this.loadLocale(newLocale)
            }
        },
        async created () {
            this.available = options.availableLanguages
            await this.loadLocale(this.current)
        },
        destroy () {
        },
        methods: {
            async loadLocale (newLocale) {
                if (!Object.prototype.hasOwnProperty.call(translate.translations, newLocale)) {
                    try {
                        // @todo dynamically load resource with configurable path
                        const module = await import(/* webpackChunkName: "locale/[request]" */ '~/locale/' + newLocale + '.json')
                        translate.translations[newLocale] = module.default
                    } catch (e) {
                        translate.translations[newLocale] = {}
                        console.error(e)
                    }
                }
                this.asyncCurrent = newLocale
                return translate.translations[newLocale]
            }
        }
    })

    inject('language', languageVm)
}

export default NuxtGettextPlugin
