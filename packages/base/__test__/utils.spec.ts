import { it, describe, expectTypeOf, expect } from 'vitest';
import { debounce, getNow, isIterable, sleep, throttle } from '../src';

describe('utils', () => {
  describe('funcHandler', () => {
    it('sleep', () => {
      const now = getNow();
      expect(sleep(100))
        .resolves.toBeUndefined()
        .then(() => {
          expect(Math.ceil(getNow() - now)).toBeGreaterThanOrEqual(100);
        });
    });

    it('debounce', async ({ expect }) => {
      let count = 0;
      const func = debounce(() => {
        ++count;
      }, 100);

      func();
      func();
      expect(count).toBe(0);

      const func2 = debounce(
        () => {
          ++count;
        },
        100,
        true,
      );

      func2();
      expect(count).toBe(1);
      await sleep(100);
      func();
      func();
      expect(count).toBe(2);
      await sleep(100);
      expect(count).toBe(3);
      func2();
      func2();
      expect(count).toBe(4);
      await sleep(100);
      expect(count).toBe(4);

      const func3 = debounce(() => {
        ++count;
      }, 0);
      func3();
      expect(count).toBe(5);
      func3();
      expect(count).toBe(6);
    });

    it('throttle', async ({ expect }) => {
      let count = 0;
      const func = throttle(() => {
        ++count;
      }, 100);
      func();
      func();
      expect(count).toBe(1);

      await sleep(100);
      func();
      func();
      expect(count).toBe(2);
      const func2 = throttle(
        () => {
          ++count;
        },
        100,
        false,
      );
      func2();
      func2();
      expect(count).toBe(2);
      await sleep(100);
      expect(count).toBe(3);

      const func3 = throttle(() => {
        ++count;
      }, 0);
      func3();
      expect(count).toBe(4);
      func3();
      expect(count).toBe(5);
    });
  });
  describe('verfy', () => {
    it('isIterable', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable({})).toBe(false);
      expect(isIterable(null)).toBe(false);
      expect(isIterable(undefined)).toBe(false);
      expect(isIterable(1)).toBe(false);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable(new Promise(() => {}))).toBe(false);
      expect(isIterable(new Date())).toBe(false);
      const testGenerator = {
        *[Symbol.iterator]() {
          yield 1;
          yield 2;
          yield 3;
        },
      };
      expect(isIterable(testGenerator)).toBe(true);
      const testIterator = testGenerator[Symbol.iterator]();
      expect(isIterable(testIterator)).toBe(true);
    });
  });
});
