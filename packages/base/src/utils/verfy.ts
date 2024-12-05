import { getType } from 'src/cirDep/getData';
import { EMPTY } from 'src/common/constant';

// * 判断值是否为空, 包含 undefined 和 null
export function isNull(value: any): value is null {
  return typeof value === 'undefined' || (typeof value === 'object' && value === null);
}

// * 如果给定值在被转换为数字后为 NaN 则返回值为 true；否则为 false
export function isNaN(value: any): value is typeof NaN {
  return typeof value === 'number' && value !== value;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isTrue(value: any): value is true {
  return value === true && String(value).toLowerCase() === 'true';
}

export function isFalse(value: any): value is false {
  return value === false && String(value).toLowerCase() === 'false';
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

// * 判断一个值是否为Promise对象，通过检查值是否存在且具有then方法来确定
export function isPromise(value: any): value is Promise<any> {
  return (value || false) && typeof value.then === 'function';
}

export function isEmpty(value: any): boolean {
  if (value === EMPTY) return true;
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return isNaN(value) || false;
  if (typeof value === 'object' && value !== null) {
    const type = getType(value);
    if (['set', 'map', 'weakmap', 'weakset'].includes(type)) return value.size === 0;
    return Object.keys(value).length === 0;
  }
  return isNull(value) || !value;
}

export function isFile() {
  if (!File) return false;
  if (File.prototype.isPrototypeOf) {
    return (value: any): boolean => File.prototype.isPrototypeOf(value);
  }
  return (value: any): boolean => value instanceof File;
}

export function isBlob() {
  if (!Blob) return false;
  if (Blob.prototype.isPrototypeOf) {
    return (value: any): boolean => Blob.prototype.isPrototypeOf(value);
  }
  return (value: any): boolean => value instanceof Blob;
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  return typeof value === 'object' && value !== null && typeof value[Symbol.iterator] === 'function';
}
