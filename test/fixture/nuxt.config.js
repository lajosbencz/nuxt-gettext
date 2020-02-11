const { resolve } = require('path')

module.exports = {
    rootDir: resolve(__dirname, '../..'),
    buildDir: resolve(__dirname, '.nuxt'),
    srcDir: __dirname,
    render: {
        resourceHints: false
    },
    modules: [
        [resolve(__dirname, '..', '..', 'src', 'index.js'), {
            defaultLocale: 'hu-HU',
            availableLocales: {
                'en-GB': 'British English',
                'en-US': 'United States English',
                'hu-HU': 'Magyar'
            }
        }]
    ],
    serverMiddleware: [
    ],
    build: {
        terser: false
    }
}
