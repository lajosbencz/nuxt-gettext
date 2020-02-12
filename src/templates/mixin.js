import translate from './translate'

export default {
    methods: {
        /*
         * Returns a string of the translation of the message.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} msgid - The translation key
         *
         * @return {String} The translated string
        */
        $gettext (msgid) {
            return translate.getTranslation(this.$language.asyncCurrent, msgid)
        },

        /*
         * Returns a string of the translation for the given context.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} context - The context of the string to translate
         * @param {String} msgid - The translation key
         *
         * @return {String} The translated string
        */
        $pgettext (context, msgid) {
            return translate.getTranslation(this.$language.asyncCurrent, msgid, 1, context)
        },

        /*
         * Returns a string of the translation of either the singular or plural,
         * based on the number.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} msgid - The translation key
         * @param {String} plural - The plural form of the translation key
         * @param {Number} n - The number to switch between singular and plural
         *
         * @return {String} The translated string
        */
        $ngettext (msgid, plural, n) {
            return translate.getTranslation(this.$language.asyncCurrent, msgid, n, null, plural)
        },

        /*
         * Returns a string of the translation of either the singular or plural,
         * based on the number, for the given context.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} context - The context of the string to translate
         * @param {String} msgid - The translation key
         * @param {String} plural - The plural form of the translation key
         * @param {Number} n - The number to switch between singular and plural
         *
         * @return {String} The translated string
        */
        $npgettext (context, msgid, plural, n) {
            return translate.getTranslation(this.$language.asyncCurrent, msgid, n, context, plural)
        },

        $gettextInterpolate (msgid, context = {}, disableHtmlEscaping = false) {
            // @todo check for reactivity
            return translate.interpolate(msgid, context, disableHtmlEscaping)
        }
    }
}
