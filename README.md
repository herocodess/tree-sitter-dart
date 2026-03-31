# @driftlog/tree-sitter-dart

Dart grammar for [tree-sitter](https://tree-sitter.github.io/tree-sitter/), published with prebuilt N-API binaries.

Based on [UserNobody14/tree-sitter-dart](https://github.com/UserNobody14/tree-sitter-dart).

## Platforms

Prebuilt binaries are included for:

| OS | Arch |
|----|------|
| macOS | x64, arm64 |
| Linux | x64, arm64 |

Falls back to compiling from source if no prebuilt is available for your platform.

## Install

```bash
npm install @driftlog/tree-sitter-dart tree-sitter
```

## Usage

```js
const Parser = require('tree-sitter')
const Dart = require('@driftlog/tree-sitter-dart')

const parser = new Parser()
parser.setLanguage(Dart)

const tree = parser.parse(`
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());
`)

console.log(tree.rootNode.toString())
```

## Requirements

- Node.js >= 18
- `tree-sitter` >= 0.22.0

## Development

```bash
# Install dependencies
npm install --ignore-scripts

# Build from source
npx node-gyp rebuild

# Run tests
npm test

# Build prebuilt binary
npm run prebuild
```

## License

ISC
