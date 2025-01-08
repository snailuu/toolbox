import { getUserAgent } from '$/cirDep/getUserAgent';
import { cacheByReturn } from './func-handler';

export const isWeb = cacheByReturn(() => {
  const ua = getUserAgent().toLocaleLowerCase();
  return !ua.includes('node') && window && 'onload' in window;
});

export function isInIframe(): boolean {
  if (!isWeb())
    return false;
  if (window?.frames?.length !== window?.parent?.frames?.length)
    return true;
  return false;
}
