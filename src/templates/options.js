export default {
    ...{
        namespace: 'gettext',
        languageCookieKey: '_nuxt_gettext_language',
        defaultLanguage: 'en_US',
        availableLanguages: {
            en_US: 'English'
        },
        languageVmMixin: {},
        silent: false
    },
    ...JSON.parse('<%= JSON.stringify(options) %>')
}
