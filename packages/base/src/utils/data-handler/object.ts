import type { TObject } from '$/types/base';
import { warning } from '$/common';
import { STATIC_TYPE } from '$/common/constant';
import { cacheByReturn, tryCall, tryCallFunc } from '../func-handler';
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

/**
 * 合并对象
 */
function _merge(target: any, source: any) {
  const tartgetType = getType(target);
  const sourceType = getType(source);
  if (STATIC_TYPE.includes(tartgetType))
    return target;
  if (tartgetType !== sourceType) {
    if (STATIC_TYPE.includes(sourceType))
      return source;
    warning('传入的两个参数类型不同,无法合并...');
    return target;
  }
  if (tartgetType === 'string' || tartgetType === 'number')
    return target + source;
  if (Array.isArray(target))
    return target.concat(source);
  if (tartgetType === 'object') {
    for (const key in source) {
      const item = source[key];
      let current = target[key] ?? item;
      if (!STATIC_TYPE.includes(getType(current)) && typeof item === 'object' && item !== null) {
        current = target[key] || (Array.isArray(item) ? [] : {});
        current = _merge(current, item);
      }
      target[key] = current;
    }
  }
  return target || source;
}

/**
 * 合并对象, 会修改 target 对象
 *
 * tips: 如不希望修改 target 对象, 请使用 cloneMerge
 */
export function merge(target: any, ...sources: any[]) {
  return sources.reduce((acc, cur) => _merge(acc, cur), target);
}

/**
 * 合并对象, 返回新对象，不影响原数据
 */
export function cloneMerge(target: any, ...sources: any[]) {
  target = deepClone(target);
  return merge(target, ...sources);
}

/**
 * 将可迭代对象转换为对象
 */
export const fromEntries = cacheByReturn(() => {
  if (typeof Object.fromEntries === 'function')
    return (entries: Iterable<readonly [PropertyKey, any]>) => Object.fromEntries(entries);
  if (typeof Array.from === 'function' && typeof Object.assign === 'function') {
    return (entries: Iterable<readonly [PropertyKey, any]>) => {
      const obj: TObject<any> = {};
      Array.from(entries, ([key, val]) => obj[key] = val);
      return obj;
    };
  }
  return (entries: Iterable<readonly [PropertyKey, any]>) => {
    const obj: any = {};
    tryCall(() => {
      for (const [key, val] of entries) {
        obj[key] = val;
      }
    }, tryCallFunc(() => {
      const iterable = entries[Symbol.iterator]();
      let curr = iterable.next();
      while (!curr.done) {
        const [key, val] = curr.value;
        obj[key] = val;
        curr = iterable.next();
      }
    }));
    return obj;
  };
});
