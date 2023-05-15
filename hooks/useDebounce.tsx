import { useEffect, useRef, useState } from "react";

function useDebounce(value: string, delay: number = 500): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  let searchRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (() => {
      if(searchRef.current) {
        clearTimeout(searchRef.current);
      }

      searchRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    })();

    return () => {
      if(!searchRef.current) return;
      clearTimeout(searchRef.current);
    }
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
