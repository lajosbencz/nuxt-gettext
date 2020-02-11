export default {
    ...{
        localeCookieKey: '_nuxt_gettext_locale',
        defaultLanguage: 'en_US',
        availableLanguages: {
            en_US: 'English'
        },
        languageVmMixin: {},
        silent: false
    },
    ...JSON.parse('<%= JSON.stringify(options) %>')
}
