import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useLocalStorageState = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue));
      }
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isHydrated]);

  return [state, setState];
};

export default useLocalStorageState;
