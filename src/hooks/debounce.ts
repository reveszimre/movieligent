import { useCallback, useRef } from 'react';

export const useDebounceHook = () => {
  const timer = useRef<NodeJS.Timeout | undefined>();

  const cancelDebounce = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  const debounce = useCallback(
    (func: () => void) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func();
        cancelDebounce();
      }, 1000);
      return () => cancelDebounce();
    },
    [cancelDebounce],
  );

  return { debounce, cancelDebounce, isDebouncing: Boolean(timer.current) };
};
