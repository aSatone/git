const { off } = require("element-plus/es/utils/dom.js");

/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{
    "vue/multi-word-component-names":off,
  }
}
