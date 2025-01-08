export function warning(...args: any[]) {
  // @ts-expect-error any
  if (globalThis?.__ClConfig__?.disableWarning)
    return;
  console.warn('@snailuu/base:>', ...args);
}
