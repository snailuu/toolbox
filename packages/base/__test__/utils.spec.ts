import { it, describe, expectTypeOf, expect } from 'vitest';
import { debounce, getNow, sleep, throttle } from '../src';

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
});
