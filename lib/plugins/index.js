import Component from '../templates/component'
import options from '../templates/options'
import translate from '../templates/translate'
import interpolate from '../templates/interpolate'
import Vue from 'vue'
import Cookie from 'cookie-universal'

import '../templates/middleware'

const COOKIE_KEY = '_nuxt_gettext_locale'

const NuxtGettextPlugin = function ({ req, res, beforeNuxtRender, nuxtState }, inject) {
    let defaultLanguage = options.defaultLanguage
    let cookies

    if (process.client) {
        cookies = Cookie()
    } else {
        cookies = Cookie(req, res)
    }

    const cookieLanguage = cookies.get(options.localeCookieKey)
    if (cookieLanguage) {
        defaultLanguage = cookieLanguage
    }

    translate.translations = {}
    if (process.server) {
        beforeNuxtRender(({ nuxtState }) => {
            nuxtState.translations = {
                [defaultLanguage]: require('~/locale/' + defaultLanguage + '.json')
            }
        })
    } else {
        translate.translations = nuxtState.translations
    }

    const languageVm = new Vue({
        mixins: [options.languageVmMixin],
        data () {
            return {
                current: defaultLanguage,
                asyncCurrent: ''
            }
        },
        watch: {
            async current (newLocale) {
                cookies.set(COOKIE_KEY, newLocale)
                // this.$cookies.set(COOKIE_KEY, newLocale);
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
                    // @todo dynamically load resource with configurable path
                    const module = await import(/* webpackChunkName: "locale/[request]" */ '~/locale/' + newLocale + '.json')
                    translate.translations[newLocale] = module.default
                }
                this.asyncCurrent = newLocale
                return translate.translations[newLocale]
            }
        }
    })

    inject('language', languageVm)
    Vue.component('translate', Component)
    Vue.prototype.$gettext = translate.gettext.bind(translate)
    Vue.prototype.$pgettext = translate.pgettext.bind(translate)
    Vue.prototype.$ngettext = translate.ngettext.bind(translate)
    Vue.prototype.$npgettext = translate.npgettext.bind(translate)
    Vue.prototype.$gettextInterpolate = interpolate.bind(interpolate)
}

export default NuxtGettextPlugin
