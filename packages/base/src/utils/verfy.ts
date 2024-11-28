// * 判断值是否为空, 包含 undefined 和 null
export function isNull(value: any): value is null {
  return typeof value === 'undefined' || (typeof value === 'object' && value === null);
}

// * 如果给定值在被转换为数字后为 NaN 则返回值为 true；否则为 false
export function isNaN(value: any): value is typeof NaN {
  return typeof value === 'number' && value !== value;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

// * 判断一个值是否为Promise对象，通过检查值是否存在且具有then方法来确定
export function isPromise(value: any): value is Promise<any> {
  return (value || false) && typeof value.then === 'function';
}
