import { useEffect, useState } from 'react';

interface Props {
  time: number;
  timeUp: () => void;
}

export const Timer = (props: Props) => {
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime === 0) {
          clearInterval(timer);
          props.timeUp();
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{time}s</span>;
};
