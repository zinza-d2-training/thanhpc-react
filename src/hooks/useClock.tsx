import { useState, useEffect } from 'react';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}
const perfectNumber = (value: number) => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};
export const useClock = (timeArgs: Time) => {
  const initTime: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  const [time, setTime] = useState<Time>(timeArgs || initTime);
  useEffect(() => {
    const { hours, minutes, seconds } = time;
    const timeoutId = setTimeout(() => {
      let totalSeconds = hours * 60 + minutes * 60 + seconds;
      if (totalSeconds > 0) {
        totalSeconds -= 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds - newHours * 3600) / 60);
        const newSeconds = totalSeconds - newHours * 3600 - newMinutes * 60;
        setTime({
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        });
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);
  return {
    time: `${perfectNumber(time.hours)}:${perfectNumber(
      time.minutes
    )}:${perfectNumber(time.seconds)}`,
    setTime
  };
};
