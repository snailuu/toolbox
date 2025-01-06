/* eslint-disable */
// @vitest-environment happy-dom
// @ts-nocheck
import { describe, inject, it } from 'vitest';
import { sleep } from './../src/utils/func-handler/sleep';

describe('func-handler', async() => {
  const {
    sleep,
    sleepSync,
    debounce,
    throttle,
    chunkTask,
    getNow,
  } = await (() => {
    return inject('CI') ? import('../dist') : import('../src');
  })() as typeof import('../src');

  it('sleep', async ({ expect }) => {
    const now = getNow();
    expect(sleep(100))
      .resolves
      .toBeUndefined()
      .then(() => {
        expect(Math.ceil(getNow() - now)).toBeGreaterThanOrEqual(100);
      });
  });

  it('sleepSync', async ({ expect }) => {
    const now = getNow();
    sleepSync(100);
    expect(Math.ceil(getNow() - now)).toBeGreaterThanOrEqual(100);
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

  it('chunkTask', async({expect}) => {
    const func = chunkTask((a: number, b: number = 0) => {
      sleepSync(16);
      return a + b;
    });
    expect(
      func([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).resolves.toEqual([3, 7, 11]);

    expect(func(10)).resolves.toEqual(Array.from({ length: 10 }, (_, i) => i));

    expect(
      chunkTask(() => {
        throw new Error('error');
      })(3),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: error]`);
  });
});
