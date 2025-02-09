import { useRef, useEffect } from "react";

const useDebounced = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (...args: T) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => func(...args), delay);
  };
};

export default useDebounced;
