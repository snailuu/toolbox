/**
 * 判断一个值是否为类数组
 * @param data 待判断数据类型
 *
 * tips:
 *  1. 有索引属性
 *  2. 有length属性且为非负整数
 *  3. 对象
 */
export function isArrayLike(data: any): boolean {
  if (Array.isArray(data))
    return true;
  if (data instanceof String)
    return true;
  if (data && typeof data === 'object' && typeof data.length === 'number')
    return true;
  return false;
}

export function isArray(data: any): data is Array<any>;
export function isArray<T>(value: T[]): value is T[];
export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}
