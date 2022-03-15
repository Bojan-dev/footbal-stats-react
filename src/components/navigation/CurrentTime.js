import { useEffect, useState } from 'react';
import getTime from '../../functions/getTime';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime(new Date()));
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p>🕛 {currentTime}</p>;
};

export default CurrentTime;
