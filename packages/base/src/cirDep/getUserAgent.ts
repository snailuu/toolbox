export function getUserAgent(): string {
  // 检查是否在浏览器环境中
  if (globalThis.navigator) {
    // @ts-expect-error env
    // 返回浏览器的 userAgent 或 swuserAgent（如果存在）
    return globalThis.navigator.userAgent || globalThis.navigator.swuserAgent;
    // 检查是否在 Node.js 环境中
  }
  // eslint-disable-next-line node/prefer-global/process
  else if (process) {
    // 返回包含 Node.js 版本、平台、架构、shell、语言和终端程序信息的字符串
    // eslint-disable-next-line node/prefer-global/process
    return `Node.js/${process.version} (${process.platform}; ${process.arch}) ${process.env.SHELL} ${process.env.LANG} ${process.env.TERM_PROGRAM}`;
  }
  // 如果既不在浏览器环境也不在 Node.js 环境中，返回空字符串
  return '';
}
