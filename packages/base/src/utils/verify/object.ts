import { warning } from '$/common/warning';
import { cacheByReturn } from '../func-handler';
import { isInIframe } from '../ua';

export function isPromise(value: any): value is Promise<any>;
export function isPromise<T>(value: Promise<T>): value is Promise<T>;
export function isPromise(value: any): value is Promise<any> {
  return (value || false) && typeof value.then === 'function';
}

export const isFile = cacheByReturn(() => {
  if (isInIframe()) {
    warning('iframe 中无法正确判断!!!');
    return false;
  }
  if (!File) {
    return false;
  }
  if (File.prototype) {
    return (value: any): boolean => Object.prototype.isPrototypeOf.call(File.prototype, value);
  }
  return (value: any): boolean => value instanceof File;
});

export const isBlob = cacheByReturn(() => {
  if (isInIframe()) {
    warning('iframe 中无法正确判断!!!');
    return false;
  }
  if (!Blob) {
    return false;
  }
  if (Blob.prototype) {
    return (value: any): boolean => Object.prototype.isPrototypeOf.call(Blob.prototype, value);
  }
  return (value: any): boolean => value instanceof Blob;
});
