import path from 'path'

import meta from '../package'

const NuxtGettextModule = function (moduleOptions) {
    const nuxtOptions = this.options.gettext || {}
    const options = { namespace: 'gettext', ...nuxtOptions, ...moduleOptions }
    const { namespace } = options

    for (const relPath of ['plugins/index.js']) {
        this.addPlugin({
            src: path.resolve(__dirname, relPath),
            fileName: path.join(namespace, relPath),
            options
        })
    }

    const templateList = ['component', 'config', 'interpolate', 'plurals', 'translate']
    for (const tpl of templateList) {
        const relPath = 'templates/' + tpl + '.js'
        this.addTemplate({
            src: path.resolve(__dirname, relPath),
            fileName: path.join(namespace, relPath),
            options
        })
    }

    this.options.router.middleware.push(namespace)
}

export default NuxtGettextModule
export { meta }
