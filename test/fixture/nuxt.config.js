const { resolve } = require('path')

module.exports = {
    rootDir: resolve(__dirname, '../..'),
    buildDir: resolve(__dirname, '.nuxt'),
    srcDir: __dirname,
    render: {
        resourceHints: false
    },
    modules: [
        'cookie-universal-nuxt',
        [resolve(__dirname, '..', '..', 'lib', 'module.js'), {
            defaultLanguage: 'en_US',
            availableLanguages: {
                'en_US' : 'English',
                'hu_HU' : 'Magyar',
            }
        }]
    ],
    serverMiddleware: [
    ],
    build: {
        terser: false
    }
}
