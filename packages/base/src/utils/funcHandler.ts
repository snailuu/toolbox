import type { TAnyFunc, TArgsType } from 'src/types/base';

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export function sleepAsync(timer: number) {
  const now = Date.now();
  while (Date.now() - now < timer);
}

export function debounce<T extends TAnyFunc>(
  func: T,
  time: number = 1000,
  immediately: boolean = false,
): (...args: TArgsType<T>) => void {
  if (time <= 0)
    return func;
  let timer: NodeJS.Timeout | null = null;
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
}

export function throttle<F extends TAnyFunc>(func: F, time = 100, immediately = true): (...args: TArgsType<F>) => void {
  if (time <= 0)
    return func;
  let timer: NodeJS.Timeout | null = null;
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
  return (...args) => {
    if (timer)
      return;
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, time);
  };
}
