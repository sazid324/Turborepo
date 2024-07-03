// eslint-disable-next-line no-unused-vars
export const debouncer = (callback: (...args: any) => void, wait = 500) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(args);
    }, wait);
  };
};
