/**
 * @vitest-environment node
 */

import { describe, expect, expectTypeOf, inject, it } from 'vitest';

describe('utils/node', async () => {
  const { getDeviceInfo, getNow, getOsType, getSafeGlobal } = await (() => {
    return inject('CI') ? import('../dist') : import('../src');
  })() as typeof import('../src');

  it('getOsType', () => {
    expectTypeOf(getOsType()).toMatchTypeOf<string>();
  });

  it('getSafeGlobal', () => {
    expect(getSafeGlobal()).toBe(globalThis);
  });

  it('getDeviceInfo', () => {
    expectTypeOf(getDeviceInfo()).toMatchTypeOf<{
      platform: string;
      userAgent: string;
      appName: string;
      appVersion: string;
      screenWidth: number;
      screenHeight: number;
      devicePixelRatio: number;
    }>();
  });

  it('getNow', () => {
    expectTypeOf(getNow()).toEqualTypeOf<number>();
  });
});
