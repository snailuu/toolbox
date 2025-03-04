/** 函数类型 */
export type TFunc<T extends unknown[], R = any> = (...args: T) => R;

/** 任一函数 */
export type TAnyFunc = TFunc<any[]>;

/** 获取函数的参数类型 */
export type TArgsType<T> = T extends (...args: infer A) => any ? A : any[];

/** 获取数组第一个元素的类型 */
export type THeadType<T extends any[]> = T extends [infer H] ? H : T extends [infer H, ...any[]] ? H : never;

/** 获取数组最后一个元素的类型 */
export type TLastType<T extends any[]> = T extends [...any[], infer L] ? L : T extends [infer L] ? L : never;

/** 获取数组剩余元素的类型 */
export type TTailTypes<A extends any[]> = A extends [any] ? [] : A extends [any, ...infer T] ? T : [];

/** 获取函数形参类型 */
export type TGetArgs<F> = F extends (...args: infer A) => any ? A : [];

/** 获取函数返回值类型 */
export type TGetReturnType<F> = F extends (...args: any[]) => infer R ? R : F;

/** 对象类型 */
export type TObject<T, K extends TObjKeyType = TObjKeyType> = Record<K, T>;

/** js 支持的所有类型 */
export type TAllType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'function'
  | 'asyncfunction'
  | 'generatorfunction'
  | 'promise'
  | 'symbol'
  | 'set'
  | 'map'
  | 'weakset'
  | 'weakmap'
  | 'date'
  | 'rgexp'
  | 'error'
  | 'null'
  | 'undefined'
  | 'bigint'
  | 'file'
  | 'urlsearchparams'
  | 'formdata'
  | 'arraybuffer'
  | 'dateview'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'float32array'
  | 'float64array'
  | 'bigint64array'
  | 'biguint64array'
  | 'blob';


/** 指定类型或指定类型的数组 */
export type TMany<T> = T | T[];

/** 对象 key 支持的类型 */
export type TObjKeyType = string | number | symbol;

/** 获取 Promise 返回值的类型 */
export type TPromiseValue<T> = Awaited<T>;

/** 深度获取对象属性的类型 */
export type TDeepGetPropType<K extends string[], T extends TObject<any>, I = T[K[0]]> = 
  I extends undefined
    ? undefined : K extends [any]
      ? I : I extends TObject<any>
        ? TDeepGetPropType<TTailTypes<K>, I> : never;
