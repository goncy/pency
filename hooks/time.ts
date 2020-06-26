import React from "react";

export function useDebounce(fn, time, dep) {
  const initialized = React.useRef<boolean>();

  React.useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const interval = setTimeout(fn, time);

    return () => clearTimeout(interval);
  }, [dep, fn, time]);
}
