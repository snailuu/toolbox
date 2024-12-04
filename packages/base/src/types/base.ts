export type TFunc<T extends unknown[], R = unknown> = (...args: T) => R;

export type TAnyFunc = TFunc<any[]>;

export type TunknownFunc = TFunc<unknown[]>;

export type TArgsType<T> = T extends (...args: infer A) => unknown ? A : unknown[];

export type THeadType<T extends unknown[]> = T extends [infer H] ? H : T extends [infer H, ...unknown[]] ? H : never;

export type TLastType<T extends unknown[]> = T extends [...unknown[], infer L] ? L : T extends [infer L] ? L : never;

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

export type GetArgs<F> = F extends (...args: infer A) => unknown ? A : [];

export type GetReturnType<F> = F extends (...args: unknown[]) => infer R ? R : F;
