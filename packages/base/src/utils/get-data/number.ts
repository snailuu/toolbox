import { cacheByReturn } from '../func-handler';
import { isNull } from '../verify';

/** 获取当前时间 */
export const getNow = cacheByReturn(() => {
  if (isNull(performance)) {
    return () => performance.now();
  }
  return () => Date.now();
});
