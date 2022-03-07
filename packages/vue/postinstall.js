/* eslint-disable */
const package = require('./package.json')
const { install } = require('../../install')
/* eslint-enable  */

install(__dirname, package.name)
