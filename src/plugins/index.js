import component from '../templates/component'
import options from '../templates/options'
import mixin from '../templates/mixin'
import translate from '../templates/translate'
import Vue from 'vue'
import Cookie from 'cookie-universal'
import serverLocale from 'accept-language-parser'
import { getUserLocales as clientLocale } from 'get-user-locale'

import '../templates/middleware'

Vue.mixin(mixin)
Vue.component(component.name, component)

export default function ({ req, res, beforeNuxtRender, nuxtState }, inject) {
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

    // const locale = options.defaultLocale

    let cookies
    if (process.client) {
        cookies = Cookie()
    } else {
        cookies = Cookie(req, res)
    }

    const supportedLocales = Object.keys(options.availableLocales)
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
        locale = options.defaultLocale
    }

    const vm = new Vue({
        mixins: [options.localeVmMixin],
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
            this.available = options.availableLocales
            await this.loadLocale(this.current)
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

    Object.defineProperty(vm, 'translations', {
        get () {
            return translate.translations
        }
    })

    inject('locale', vm)
}
