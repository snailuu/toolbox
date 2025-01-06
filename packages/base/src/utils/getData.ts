import ms from 'ms';

import { isEmpty } from './verfy';

export function getRandomString(len = 8): string {
  let result = '';
  for (let curLen = 0; curLen < len; curLen = result.length) {
    const str = Math.random()
      .toString(36)
      .slice(2, len + 2);
    result += str.slice(0, len - curLen);
  }
  return result;
}

export function getNow() {
  if (typeof performance !== 'undefined') {
    return performance.now();
  }
  return Date.now();
}

type GCArgs =
  | string
  | (undefined | null | string | Record<string, boolean>)[]
  | Record<string, boolean>
  | undefined
  | null;

export function generateClassname(...args: GCArgs[]) {
  if (!args.length)
    return '';
  const className: string = args
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      }
      else if (Array.isArray(arg)) {
        return generateClassname(...arg);
      }
      else if (typeof arg === 'object' && arg !== null) {
        return Object.keys(arg)
          .filter(key => arg[key])
          .join(' ');
      }
      else {
        return '';
      }
    })
    .join(' ')
    .replace(/\s+/g, ' ');
  return className.trimEnd();
}

export interface CookieOptions {
  duration?: number; // 过期时间，单位为毫秒
  expiress?: string | Date; // 过期时间，字符串或Date对象
  domain?: string; // 域名
  maxAge?: number; // 过期时间，单位为秒
  path?: string; // 路径
}
export function generateCokkieInfo(options: CookieOptions = {}) {
  const { duration, expiress, domain, maxAge, path } = options;
  let infoString = '';
  if (isEmpty(options))
    return infoString;
  if (duration) {
    const date = new Date();
    date.setTime(date.getTime() + duration);
    infoString += `expires=${date.toUTCString()};`;
  }
  else if (expiress) {
    if (typeof expiress === 'string') {
      const date = new Date();
      date.setTime(date.getTime() + ms(expiress));
      infoString += `expires=${date.toUTCString()};`;
    }
    else if (expiress instanceof Date) {
      infoString += `expires=${expiress.toUTCString()};`;
    }
    else {
      throw new TypeError('exprires 必须是字符串或 Date (推荐使用Date)');
    }
  }
  if (domain) {
    infoString += `domain=${domain};`;
  }
  if (maxAge) {
    infoString += `max-age=${maxAge};`;
  }
  if (path) {
    infoString += `path=${path};`;
  }
  return infoString;
}
