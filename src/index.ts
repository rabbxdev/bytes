const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const UNITS_SI = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const UNIT_SIZE = 1024;
const UNIT_SIZE_SI = 1000;
const UNITS_BINARY = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const UNIT_SIZE_BINARY = 1024;

export function bytes(
  bytes: number,
  opts: { si?: boolean; decimals?: number; space?: boolean } = {}
): string {
  if (!isFinite(bytes) || bytes === 0) return '0B';

  const neg = bytes < 0;
  if (neg) bytes = -bytes;

  const si = opts.si?? false;
  const decimals = opts.decimals?? 1;
  const space = opts?.space ? ' ' : '';
  const base = si? UNIT_SIZE_SI : UNIT_SIZE;
  const units = si? UNITS_SI : UNITS;
 
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);
  const val = bytes / Math.pow(base, i);

  const formatted = decimals === 0
   ? Math.round(val).toString()
    : val.toFixed(decimals).replace(/\.0+$/, '');

  return (neg? '-' : '') + formatted + space + units[i];
}


export function parse(str: string): number {
  if (typeof str!== 'string' ||!str) return NaN;

  const match = str.trim().match(/^([+-]?[\d.]+)\s*([KMGTPE]?B)?$/i);
  if (!match) return NaN;

  const num = parseFloat(match[1]);
  if (isNaN(num)) return NaN;

  const unit = match[2] || 'B';

  // Handle unit matching with case sensitivity
  if (unit === 'B' || unit === 'b') return num;

  if (unit === 'kB') return num * UNIT_SIZE_SI;

  const unitUpper = unit.toUpperCase();
  const idx = UNITS_BINARY.indexOf(unitUpper);
  if (idx === -1) return NaN;

  const base = unit === unitUpper? UNIT_SIZE_BINARY : UNIT_SIZE_SI;
  return num * Math.pow(base, idx);
}

export default bytes;