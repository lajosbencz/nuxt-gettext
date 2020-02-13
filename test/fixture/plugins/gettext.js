export default function ({ app, $wamp, redirect }) {
    console.log(app.$gettext('translation.js'))
    console.log(app.$ngettext('%{n} translation.js', '%{n} translations.js', 1))
    console.log(app.$pgettext('ctx', 'translation.js'))
    console.log(app.$npgettext('ctx', '%{n} translation.js', '%{n} translations.js', 2))
}
