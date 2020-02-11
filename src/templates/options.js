export default {
    ...{
        namespace: 'gettext',
        localeCookieKey: '_nuxt_gettext_locale',
        defaultLocale: 'en_US',
        availableLocales: {
            en_US: 'English'
        },
        localeVmMixin: {},
        silent: false
    },
    ...JSON.parse('<%= JSON.stringify(options) %>')
}
