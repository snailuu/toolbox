import type { TAnyFunc, TGetArgs, TGetReturnType } from '$/types/base';
import { INTERNAL_EMPTY } from '$/common/constant';

/**
 * 执行一次的函数, 后续调用返回上一次执行结果
 * @param func 运行函数
 * @returns 函数执行结果
 */
export function onceFunc<T extends TAnyFunc>(func: T): T {
  let called = false;
  let result: ReturnType<T> | null = null;
  return function (...args) {
    if (called)
      return result;
    called = true;
    return (result = func(...args));
  } as T;
}

/**
 * 缓存函数执行结果
 */
class MemoizeMap {
  #_map = new Map();
  #_weakMap = new WeakMap();

  #_isObject(key: any) {
    return typeof key === 'object' && key !== null;
  }

  set(key: any, value: any) {
    if (this.#_isObject(key)) {
      this.#_weakMap.set(key, value);
    }
    else {
      this.#_map.set(key, value);
    }
  }

  get(key: any) {
    if (this.#_isObject(key)) {
      return this.#_weakMap.get(key);
    }
    return this.#_map.get(key);
  }

  has(key: any) {
    if (this.#_isObject(key)) {
      return this.#_weakMap.has(key);
    }
    return this.#_map.has(key);
  }
}

/**
 * 缓存函数执行结果
 * @param func 运行函数
 * @param resolver 缓存键值解析函数, 默认为第一个参数
 * @returns 函数调用结果
 */
export function memoize<F extends TAnyFunc>(func: F, resolver?: (...args: TGetArgs<F>) => any) {
  const memoized = function (...args: TGetArgs<F>): TGetReturnType<F> {
    const key = resolver ? resolver(...args) : args[0];
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = new MemoizeMap();
  return memoized;
}

/**
 * 缓存函数执行结果
 * @param cacheLoad 缓存加载函数
 * @returns 缓存函数
 */
export const cacheByReturn: <T extends () => any, R = ReturnType<T>>(
  cacheLoad: T
) => (...args: TGetArgs<R>) => TGetReturnType<R> = (() => {
  if (Reflect?.apply) {
    return (cacheLoad) => {
      let cache: any = INTERNAL_EMPTY;
      return (...args) => {
        if (cache === INTERNAL_EMPTY) {
          cache = cacheLoad();
        }
        if (typeof cache !== 'function')
          return cache;

        return Reflect.apply(cache, null, args);
      };
    };
  }
  return (cacheLoad) => {
    let cache: any = INTERNAL_EMPTY;
    return (...args) => {
      if (cache === INTERNAL_EMPTY) {
        cache = cacheLoad();
      }
      if (typeof cache !== 'function')
        return cache;
      return cache(...args);
    };
  };
})();
