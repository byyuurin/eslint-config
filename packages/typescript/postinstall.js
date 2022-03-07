/* eslint-disable */
const package = require('./package.json')
const { install } = require('@byyuurin/eslint-config-basic/utils')
/* eslint-enable  */

install(__dirname, package.name)
