import { getNow } from '../getData';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function sleepSync(ms: number) {
  const start = getNow();
  while (getNow() - start < ms);
}
