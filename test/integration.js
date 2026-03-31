'use strict'
const assert = require('assert')
let p = 0, f = 0
const pass = m => { console.log(`  ✓ ${m}`); p++ }
const fail = (m, e) => { console.error(`  ✗ ${m}`, e?.message || ''); f++ }

console.log('\n@driftlog/tree-sitter-dart integration test\n')

let Dart
try {
  Dart = require('../index.js')
  assert(Dart !== null)
  pass('Grammar loaded')
} catch(e) { fail('Load failed', e); process.exit(1) }

let parser
try {
  const P = require('tree-sitter')
  parser = new P()
  parser.setLanguage(Dart)
  pass('setLanguage() accepted grammar')
} catch(e) { fail('setLanguage failed -- LANGUAGE_TYPE_TAG wrong', e); process.exit(1) }

const src = `
import 'dart:core';
import 'package:flutter/material.dart';
import '../relative/path.dart';
export 'package:x/y.dart';
part 'src/part.dart';
void main() => runApp(const App());
`
try {
  const tree = parser.parse(src)
  assert(!tree.rootNode.hasError, 'Must have no parse errors')
  pass('Parsed with no errors')
  const find = (n, t, a=[]) => { if(n.type===t) a.push(n); for(let i=0;i<n.childCount;i++) find(n.child(i),t,a); return a }
  const imports = find(tree.rootNode, 'import_or_export')
  assert(imports.length >= 3, `Expected >=3 imports, got ${imports.length}`)
  pass(`Found ${imports.length} import_or_export nodes`)
  const sources = imports.flatMap(n => {
    return find(n, 'string_literal').map(c => c.text.replace(/['"]/g,''))
  })
  assert(sources.includes('dart:core'), "Must find 'dart:core'")
  assert(sources.includes('package:flutter/material.dart'), "Must find flutter")
  pass(`Sources: ${sources.join(', ')}`)
} catch(e) { fail('Parse test failed', e) }

console.log(`\n${p} passed, ${f} failed\n`)
if(f>0) { console.error('FAILED'); process.exit(1) }
console.log('All tests passed.')
