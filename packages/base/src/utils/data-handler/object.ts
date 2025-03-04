import type { TObject } from '$/types/base';
import { STATIC_TYPE } from '$/common/constant';
import { getType } from '../get-data';

/**
 * 深拷贝
 */
export function deepClone<T extends TObject<any>>(obj: T, hash = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object' || STATIC_TYPE.includes(getType(obj)))
    return obj;
  if (hash.has(obj))
    return hash.get(obj) as T;

  const newObj: TObject<any> = Array.isArray(obj) ? [] : {};
  hash.set(obj, newObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key], hash);
    }
  }
  return newObj as T;
}
