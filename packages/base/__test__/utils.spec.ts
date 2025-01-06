/* eslint-disable */
// @vitest-environment happy-dom
// @ts-nocheck
import { describe, expect, expectTypeOf, inject, it } from 'vitest';

describe('utils', async () => {
  const {
    getNow,
    sleep,
    gc,
    getRandomString
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

  
});
