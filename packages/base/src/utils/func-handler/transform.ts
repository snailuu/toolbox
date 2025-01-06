import type { TAnyFunc, TArgsType } from '$/types/base';
import { getNow } from '../getData';
import { cacheByReturn } from './cache';

/**
 * 防抖函数
 * @param func 函数
 * @param time 延迟时间
 * @param immediately 是否立即执行
 * @returns 防抖函数
 */
export function debounce<F extends TAnyFunc>(
  func: F,
  time = 1000,
  immediately = false,
): (...args: TArgsType<F>) => void {
  if (time <= 0)
    return func;
  let timer: NodeJS.Timeout | null = null;
  // @ts-expect-error return func
  return cacheByReturn(() => {
    if (immediately) {
      return (...args: any) => {
        if (timer)
          clearTimeout(timer);
        else func(...args);
        timer = setTimeout(() => {
          timer = null;
        }, time);
      };
    }
    return (...args: any) => {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, time);
    };
  });
}

/**
 * 节流函数
 * @param func 函数
 * @param time 延迟时间
 * @param immediately 是否立即执行
 * @returns 节流函数
 */
export function throttle<F extends TAnyFunc>(
  func: F,
  time = 100,
  immediately = true,
): (...args: TArgsType<F>) => void {
  if (time <= 0)
    return func;
  let timer: NodeJS.Timeout | null = null;
  // @ts-expect-error return func
  return cacheByReturn(() => {
    if (immediately) {
      return (...args: any) => {
        if (timer)
          return;
        func(...args);
        timer = setTimeout(() => {
          timer = null;
        }, time);
      };
    }
    return (...args: any) => {
      if (timer)
        return;
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, time);
    };
  });
}

/**
 * 任务调度器，使用不同的浏览器 API 来优化任务执行的时机
 */
const _runTask = cacheByReturn(
  (): ((
    task: TAnyFunc,
    args: any[],
    resolve: (value: any) => void,
    reject: (reason?: any) => void
  ) => void) => {
    // @ts-expect-error 兼容低版本
    if (globalThis.requestIdleCallback) {
      return (task, args, resolve, reject) => {
        requestIdleCallback((idle) => {
          if (idle.timeRemaining() > 0) {
            try {
              const result = task(...args);
              resolve(result);
            }
            catch (error) {
              reject(error);
            }
          }
          else {
            _runTask(task, args, resolve, reject);
          }
        });
      };
    }
    // @ts-expect-error 兼容低版本
    if (globalThis.requestAnimationFrame) {
      return (task, args, resolve, reject) => {
        const start = getNow();
        requestAnimationFrame(() => {
          if (getNow() - start < 16.6) {
            try {
              const result = task(...args);
              resolve(result);
            }
            catch (error) {
              reject(error);
            }
          }
          else {
            _runTask(task, args, resolve, reject);
          }
        });
      };
    }
    return (task, args, resolve, reject) => {
      setTimeout(() => {
        try {
          const result = task(...args);
          resolve(result);
        }
        catch (error) {
          reject(error);
        }
      }, 0);
    };
  },

);

/**
 * 将任务分批执行
 * @param task 任务
 * @returns 任务调度器
 */
export function chunkTask<F extends TAnyFunc>(task: F) {
  return (datas: Parameters<F>[] | number): Promise<ReturnType<F>[]> => {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
      const func = async (args: any[]) => {
        return new Promise(_runTask.bind(null, task, args)).then(res => results.push(res), reject);
      };
      (async () => {
        if (typeof datas === 'number') {
          for (let i = 0; i < datas; ++i) {
            await func([i]);
          }
        }
        else if (Array.isArray(datas)) {
          for (const key in datas) {
            const data = datas[key];
            await func(data);
          }
        }
        resolve(results);
      })();
    });
  };
}
