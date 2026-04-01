# json-skeleton

A lightweight, immutable utility to generate structural skeletons from complex JSON objects. 
It cleanly overrides values to their primitive defaults (`0`, `""`, `false`, `null`) while preserving full object trees and smartly deduplicating array schemas.

## Features
- **Zero dependencies** (except for build tools)
- **Immutable**: does not mutate original input objects
- **Array Deduplication**: identifies varying schemas in arrays and flattens them
- **TypeScript ready**: fully typed and ESM/CJS compatible

## Installation

```bash
npm install json-skeleton
```

## Usage

```typescript
import { createSkeleton } from 'json-skeleton';

const input = {
  a: 1,
  b: "test",
  c: [{ id: 1 }, { id: 2 }]
};

const skeleton = createSkeleton(input);
console.log(skeleton);
// { a: 0, b: "", c: [{ id: 0 }] }
```

## Scripts

- **Build**: `npm run build`
- **Test**: `npm test`
