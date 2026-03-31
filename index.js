'use strict'

const binding = require('node-gyp-build')(__dirname)

// Export the full binding object so tree-sitter@0.22 can find:
// - binding.language (the tagged External<TSLanguage>)
// - binding.name ('dart')
// - binding.nodeTypeInfo (node type array for initializeLanguageNodeClasses)
// Exporting binding.default alone loses these properties and causes
// initializeLanguageNodeClasses to crash on undefined.
module.exports = binding

try {
  module.exports.nodeTypeInfo = require('./src/node-types.json')
} catch (_) {}
