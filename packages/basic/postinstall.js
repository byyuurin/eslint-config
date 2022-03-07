/* eslint-disable */
const package = require('./package.json')
const { install } = require('./utils')
/* eslint-enable  */

install(__dirname, package.name)
