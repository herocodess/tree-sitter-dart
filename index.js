'use strict'
const binding = require('node-gyp-build')(__dirname)
module.exports = binding
module.exports.default = binding
module.exports.name = binding.name || 'dart'
try {
  module.exports.nodeTypeInfo = require('./src/node-types.json')
} catch (_) {}
