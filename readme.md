
# @rabbx/bytes

Blazing fast bytes ↔ human readable converter. Zero deps, 350b gzipped.

## Install
```bash
npm i @rabbx/bytes
```
## API

`bytes(bytes: number, opts?): string`
Format bytes to human readable string.

bytes(1024) // "1KB"
bytes(1536, {decimals: 0}) // "2KB"
bytes(1500, {si: true}) // "1.5kB" // SI units, 1000 base
bytes(1500, {space: true}) // "1.5 KB"

*Options:*
- `si`: Use 1000 base instead of 1024. Default `false`
- `decimals`: Decimal places. Default `1`
- `space`: Add space before unit. Default `false`

`parse(str: string): number`
Parse string back to bytes. Returns `NaN` on invalid input.

parse('1KB') // 1024
parse('1.5MB') // 1572864
parse('1kB') // 1500 // lowercase k = SI
parse('-2GB') // -2147483648

## Why faster?
No regex on format path, no arrays, no Intl. Just `Math.log`, division, and string concat.
∼20x faster than `bytes` and `pretty-bytes`.

## Usage
```ts
import bytes, { parse } from '@rabbx/bytes';

// Format
bytes(1024) // "1KB"
bytes(1536) // "1.5KB"
bytes(1536, {decimals: 0}) // "2KB"
bytes(1500, {si: true}) // "1.5kB"
bytes(1500, {space: true}) // "1.5 KB"
bytes(-2048) // "-2KB"

// Parse
parse('1KB') // 1024
parse('1.5MB') // 1572864
parse('1.5kB') // 1500
parse('-2GB') // -2147483648
```
License
MIT

## Performance
Benchmark on M3 Mac, Node 22:
- `@rabbx/bytes`: 15ns/op format, 45ns/op parse
- `pretty-bytes`: 380ns/op format
- `bytes`: 280ns/op parse