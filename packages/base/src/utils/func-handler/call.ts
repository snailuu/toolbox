import type { TAnyFunc, TFunc } from '$/types/base';

/**
 * 运行函数如果报错执行自定义异常处理函数, 立即执行，调用时就会运行传入的函数
 * @param runner 运行函数
 * @param catcher 异常处理函数
 * @returns 函数执行结果
 */
export function tryCall<F extends TAnyFunc>(
  runner: F,
  catcher?: (e: any) => void,
): ReturnType<F> {
  try {
    return runner();
  }
  catch (e) {
    catcher && catcher(e);
    throw e;
  }
}

/**
 * 运行函数如果报错执行自定义异常处理函数，返回一个新函数，可以接收参数
 * @param runner 运行函数
 * @param catcher 异常处理函数
 * @returns 函数执行结果
 */
export function tryCallFunc<F extends TAnyFunc>(
  runner: F,
  catcher?: (e: any) => void,
): TFunc<Parameters<F>, ReturnType<F>> {
  return (...args: Parameters<F>) => {
    try {
      return runner(...args);
    }
    catch (e) {
      catcher && catcher(e);
      throw e;
    }
  };
}

/**
 * 运行函数如果报错返回错误对象而不是抛出错误
 * @param func 运行函数
 * @param args 运行函数参数
 * @returns 函数执行结果或错误对象
 */
export function completion<T, A extends any[]>(
  func: (...args: A) => T,
  ...args: A
): T | Error {
  try {
    return func(...args);
  }
  catch (e: any) {
    return e;
  }
}
