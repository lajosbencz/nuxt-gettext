module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
    },
    extends: [
        '@nuxtjs'
    ]
};
