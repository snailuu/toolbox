export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const sleepAsync = (timer: number) => {
  const now = Date.now();
  while (Date.now() - now < timer);
};
