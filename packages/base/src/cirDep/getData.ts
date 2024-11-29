import { TAllType } from 'src/types/base';

export function getType(value: any): TAllType {
  const baseType = typeof value;
  if (baseType !== 'object' && baseType !== 'function') return baseType;
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
