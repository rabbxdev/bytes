import bytes, { parse } from './src/index.ts';

// Format
let kb = bytes(1024) // "1KB"
bytes(1536) // "1.5KB"
bytes(1536, {decimals: 0}) // "2KB"
bytes(1500, {si: true}) // "1.5kB"
bytes(1500, {space: true}) // "1.5 KB"
bytes(-2048) // "-2KB"

// Parse
let ps = parse('1KB') // 1024
parse('1.5MB') // 1572864
parse('1.5kB') // 1500
parse('-2GB') // -2147483648
console.log(kb,ps)