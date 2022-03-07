/* eslint-disable */
const package = require('./package.json')
const { install } = require('shared')
/* eslint-enable  */

install(__dirname, package.name)
