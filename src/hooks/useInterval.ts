import { useEffect, useState } from "react";

const useInterval = (fn: () => void, interval: number, autoStart?: boolean) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(undefined);
    }
  };
  const start = () => {
    setTimerId(setInterval(fn, interval));
  };

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      stop();
    };
  }, []);

  return [start, stop];
};

export { useInterval };
