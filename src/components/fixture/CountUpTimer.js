import { useEffect, useRef } from 'react';

const CountUpTimer = ({ elapsedTime, matchStatus }) => {
  const counterRef = useRef();

  const percentage = (elapsedTime) => {
    return (elapsedTime / 100) * 2.22;
  };

  useEffect(() => {
    const counter = counterRef.current.getContext('2d');
    const createArc = (time) => {
      const cw = counter.canvas.width;
      const ch = counter.canvas.height;
      let diff = 0;

      diff = 1.5 + percentage(time);
      counter.clearRect(0, 0, cw, ch);
      counter.lineWidth = 1;
      counter.fillStyle = '#ed4337';
      if (matchStatus === 'FT') counter.fillStyle = '#333333';
      counter.strokeStyle = '#2f4858';
      counter.textAlign = 'center';
      counter.font = '16px Montserrat';
      counter.fillText(`${matchStatus}`, 25, 30);
      counter.beginPath();
      counter.arc(25, 25, 24, Math.PI * 1.5, Math.PI * diff);
      counter.stroke();
    };

    createArc(elapsedTime);

    if (!isFinite(matchStatus)) return;

    //If elapsedTime is not a halftime or fulltime
    const blinkingTimeInterval = setInterval(() => {
      if (counterRef.current.getAttribute('blink') === 'true') {
        //prettier-ignore
        counter.clearRect(26.5 +counter.measureText(matchStatus).actualBoundingBoxRight,15,3,7);
        counterRef.current.setAttribute('blink', 'false');
        return;
      }
      //prettier-ignore
      counter.fillText(`'`, 28 + counter.measureText(matchStatus).actualBoundingBoxRight,30);
      counterRef.current.setAttribute('blink', 'true');
    }, 1200);

    return () => clearInterval(blinkingTimeInterval);
  }, [elapsedTime, matchStatus]);

  return (
    <canvas
      height={'50px'}
      width={'50px'}
      blink={'true'}
      ref={counterRef}
    ></canvas>
  );
};

export default CountUpTimer;
