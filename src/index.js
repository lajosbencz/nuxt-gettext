import path from 'path'
import fs from 'fs'

import meta from '../package'

const NuxtGettextModule = function (moduleOptions) {
    const nuxtOptions = this.options.gettext || {}
    const options = { namespace: 'gettext', ...nuxtOptions, ...moduleOptions }
    const { namespace } = options

    const pluginsDir = path.join(__dirname, 'plugins')
    fs.readdirSync(pluginsDir).map((fileName) => {
        this.addPlugin({
            src: path.join(pluginsDir, fileName),
            fileName: path.join(namespace, 'plugins', fileName),
            options
        })
    })

    const templatesDir = path.join(__dirname, 'templates')
    fs.readdirSync(templatesDir).map((fileName) => {
        this.addTemplate({
            src: path.join(templatesDir, fileName),
            fileName: path.join(namespace, 'templates', fileName),
            options
        })
    })

    this.options.router.middleware.push(namespace)
}

export default NuxtGettextModule
export { meta }
