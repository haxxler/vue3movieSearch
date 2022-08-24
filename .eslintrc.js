module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true
    },
    extends: [
        "eslint:recommended",
       // "plugin:vue/vue3-essential"
       "plugin:vue/vue3-strongly-recommended"
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
        //"parser": "babel-eslint"
    },
    plugins: [
        "vue"
    ],
    rules: {
        "vue/html-closing-bracket-newline": ["error",{
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
              "void": "always",
              "normal": "never",
              "component": "always"
            },
            "svg": "always",
            "math": "always"
          }]
    }
}
