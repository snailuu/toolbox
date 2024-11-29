export type TFunc<T extends any[], R = any> = (...args: T) => R;

export type TAnyFunc = TFunc<any[]>;

export type TArgsType<T> = T extends (...args: infer A) => any ? A : any[];

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

export type GetArgs<F> = F extends (...args: infer A) => any ? A : [];

export type GetReturnType<F> = F extends (...args: any[]) => infer R ? R : F;
