/* eslint-disable */
// @vitest-environment happy-dom
// @ts-nocheck
import { describe, expect, expectTypeOf, inject, it } from 'vitest';

describe('utils', async () => {
  const {
    INTERNAL_EMPTY: EMPTY,
    getNow,
    sleep,
    gc,
    getRandomString,
    isFile,
    isBlob,
    isUndef,
    isNaN,
    isNumber,
    isNull,
    isString,
    isPromise,
    isEmpty,
    isTrue,
    isFalse,
    isAsyncFunc,
    isUrl

  } = await (() => {
    return inject('CI') ? import('../dist') : import('../src');
  })() as typeof import('../src');

  describe('getData', () => {
    it('getNow', ({ expect }) => {
      expectTypeOf(getNow()).toEqualTypeOf<number>();
      const now = getNow();
      sleep(200).then(() => {
        expect(Math.ceil(Math.ceil(getNow() - now))).toBeGreaterThanOrEqual(200);
      });
    });

    it('getRandomString', ({ expect }) => {
      expect(getRandomString()).toHaveLength(8);
      expect(getRandomString(16)).toHaveLength(16);
      expect(getRandomString(32)).toHaveLength(32);
    })
  
    it('gc', ({ expect }) => {
      expect(gc('test')).toMatchInlineSnapshot(`"test"`);
      expect(gc('test')).toMatchInlineSnapshot(`"test"`);
      expect(gc()).toMatchInlineSnapshot(`""`);
      expect(gc('test', 'test2')).toMatchInlineSnapshot(`"test test2"`);
      expect(gc('test', ['test2'])).toMatchInlineSnapshot(`"test test2"`);
      expect(gc('test', { test2: true })).toMatchInlineSnapshot(`"test test2"`);
      expect(gc('test', { test2: false })).toMatchInlineSnapshot(`"test"`);
      expect(gc('test', { test2: true }, 'test3')).toMatchInlineSnapshot(`"test test2 test3"`);
      expect(gc('test', { test2: false }, 'test3')).toMatchInlineSnapshot(`"test test3"`);
      expect(gc('test', { test2: true }, ['test3'])).toMatchInlineSnapshot(`"test test2 test3"`);
      expect(gc('test', { test2: false }, ['test3'])).toMatchInlineSnapshot(`"test test3"`);
      expect(gc('test', { test2: true }, { test3: true })).toMatchInlineSnapshot(`"test test2 test3"`);
      expect(gc('test', { test2: false }, { test3: true })).toMatchInlineSnapshot(`"test test3"`);
      expect(gc(['test', { test2: true }, null])).toMatchInlineSnapshot(`"test test2"`);
      expect(gc(['test', { test2: true }, undefined])).toMatchInlineSnapshot(`"test test2"`);
    });
  });

  describe('verify', () => {
    it('isUndef', () => {
      expect(isUndef(undefined)).toBe(true);
      expect(isUndef(null)).toBe(false);
      expect(isUndef(0)).toBe(false);
      expect(isUndef('')).toBe(false);
      expect(isUndef(void 0)).toBe(true);
    });

    it('isNaN', () => {
      expect(isNaN(Number.NaN)).toBe(true);
      expect(isNaN(0)).toBe(false);
      expect(isNaN('')).toBe(false);
      expect(isNaN(0 / 1)).toBe(false);
    });

    it('isNumber', () => {
      expect(isNumber(Number.NaN)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber('')).toBe(false);
      expect(isNumber(0 / 1)).toBe(true);
      expect(isNumber(null)).toBe(false);
    });

    it('isString', () => {
      expect(isString(Number.NaN)).toBe(false);
      expect(isString(0)).toBe(false);
      expect(isString('')).toBe(true);
      expect(isString(0 / 1)).toBe(false);
    });

    it('isPromise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(0)).toBe(false);
      expect(isPromise('')).toBe(false);
      expect(isPromise(0 / 1)).toBe(false);
      expect(isPromise(new Promise(() => {}))).toBe(true);
      expect(isPromise({ then() {} })).toBe(true);
    });

    it('isEmpty', () => {
      expect(isEmpty(Number.NaN)).toBe(true);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty(0 / 1)).toBe(false);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(new Set())).toBe(true);
      expect(isEmpty(new Set([1]))).toBe(false);
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Map([['a', 1]]))).toBe(false);
      expect(isEmpty(new WeakSet())).toBe(false);
      expect(isEmpty(new WeakSet([{}]))).toBe(false);
      expect(isEmpty(new WeakMap())).toBe(false);
      expect(isEmpty(new WeakMap([[{}, 'a']]))).toBe(false);
      expect(isEmpty(EMPTY)).toBe(true);
    });

    it('isFile', () => {
      expect(isFile(new File([], 'test'))).toBe(true);
      expect(isBlob(new Blob(['test']))).toBe(true);
      expect(isFile(Number.NaN)).toBe(false);
      expect(isFile(0)).toBe(false);
      expect(isFile('')).toBe(false);
      expect(isFile(0 / 1)).toBe(false);
      expect(isFile(null)).toBe(false);
      expect(isFile(undefined)).toBe(false);
      expect(isFile([])).toBe(false);
      expect(isFile({})).toBe(false);
      expect(isFile({ a: 1 })).toBe(false);
      expect(isFile(true)).toBe(false);
      expect(isFile(new Set())).toBe(false);
      expect(isFile(new Set([1]))).toBe(false);
      expect(isFile(new Map())).toBe(false);
      expect(isFile(new Map([['a', 1]]))).toBe(false);
      expect(isFile(new WeakSet())).toBe(false);
      expect(isFile(new WeakSet([{}]))).toBe(false);
      expect(isFile(new WeakMap())).toBe(false);
      expect(isFile(new WeakMap([[{}, 'a']]))).toBe(false);
      expect(isFile(EMPTY)).toBe(false);
    });

    it('isBlob', () => {
      expect(isBlob(new File([], 'test'))).toBe(true);
      expect(isBlob(new Blob(['test']))).toBe(true);
      expect(isBlob(Number.NaN)).toBe(false);
      expect(isBlob(0)).toBe(false);
      expect(isBlob('')).toBe(false);
      expect(isBlob(0 / 1)).toBe(false);
      expect(isBlob(null)).toBe(false);
      expect(isBlob(undefined)).toBe(false);
      expect(isBlob([])).toBe(false);
      expect(isBlob({})).toBe(false);
      expect(isBlob({ a: 1 })).toBe(false);
      expect(isBlob(true)).toBe(false);
      expect(isBlob(new Set())).toBe(false);
      expect(isBlob(new Set([1]))).toBe(false);
      expect(isBlob(new Map())).toBe(false);
      expect(isBlob(new Map([['a', 1]]))).toBe(false);
      expect(isBlob(new WeakSet())).toBe(false);
      expect(isBlob(new WeakSet([{}]))).toBe(false);
      expect(isBlob(new WeakMap())).toBe(false);
      expect(isBlob(new WeakMap([[{}, 'a']]))).toBe(false);
      expect(isBlob(EMPTY)).toBe(false);
    });

    it('isUrl', () => {
      expect(isUrl('https://www.taobao.com')).toBe(true);
      expect(isUrl('https://www.taobao.com?a=1')).toBe(true);
      expect(isUrl('https://www.taobao.com?a=1&b=2')).toBe(true);
      expect(isUrl('https://www.taobao.com?a=1&b=2#test')).toBe(true);
      expect(isUrl('//www.taobao.com')).toBe(true);
      expect(isUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==')).toBe(true);
      expect(isUrl('blob:https://www.taobao.com')).toBe(true);
      expect(isUrl('http://www.taobao.com')).toBe(true);
      expect(isUrl('www.taobao.com')).toBe(false);
      expect(isUrl('')).toBe(false);
      expect(isUrl(0)).toBe(false);
      expect(isUrl(Number.NaN)).toBe(false);
      expect(isUrl(null)).toBe(false);
      expect(isUrl(undefined)).toBe(false);
    });

    it('isTrue', () => {
      expect(isTrue(true)).toBe(true);
      expect(isTrue('true')).toBe(true);
      expect(isTrue('True')).toBe(true);
      expect(isTrue('TrUe')).toBe(true);
      expect(isTrue(false)).toBe(false);
      expect(isTrue(0)).toBe(false);
      expect(isTrue('')).toBe(false);
      expect(isTrue(Number.NaN)).toBe(false);
      expect(isTrue(null)).toBe(false);
      expect(isTrue(undefined)).toBe(false);
    });

    it('isFalse', () => {
      expect(isFalse(false)).toBe(true);
      expect(isFalse('false')).toBe(true);
      expect(isFalse('False')).toBe(true);
      expect(isFalse('FaLsE')).toBe(true);
      expect(isFalse(true)).toBe(false);
      expect(isFalse(0)).toBe(false);
      expect(isFalse('')).toBe(false);
      expect(isFalse(Number.NaN)).toBe(false);
      expect(isFalse(null)).toBe(false);
      expect(isFalse(undefined)).toBe(false);
    });

    it('isAsyncFunc', () => {
      expect(isAsyncFunc(async () => {})).toBe(true);
      expect(isAsyncFunc(() => {})).toBe(false);
      expect(isAsyncFunc(0)).toBe(false);
      expect(isAsyncFunc('')).toBe(false);
      expect(isAsyncFunc(0 / 1)).toBe(false);
    });
  });
});
