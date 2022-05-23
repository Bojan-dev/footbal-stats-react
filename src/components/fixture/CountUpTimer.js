import { useEffect, useRef } from 'react';

const CountUpTimer = ({ elapsedTime, matchStatus }) => {
  const counterRef = useRef();

  console.log(matchStatus);

  const percentage = (elapsedTime) => {
    return (elapsedTime / 100) * 2.22;
  };

  useEffect(() => {
    const createArc = (time) => {
      const counter = counterRef.current.getContext('2d');
      const cw = counter.canvas.width;
      const ch = counter.canvas.height;
      let diff = 0;

      const fillCounter = () => {
        diff = 1.5 + percentage(time);
        counter.clearRect(0, 0, cw, ch);
        counter.lineWidth = 1;
        counter.fillStyle = '#ed4337';
        if (matchStatus.isFinished) counter.fillStyle = '#333333';
        counter.strokeStyle = '#2f4858';
        counter.textAlign = 'center';
        counter.font = '16px Montserrat';
        counter.fillText(`${matchStatus}`, 25, 30);
        //If it's not a halftime or fulltime
        if (isFinite(matchStatus)) {
          counter.fillText(`'`, counter.measureText(matchStatus).width * 3, 30);
        }
        counter.beginPath();
        counter.arc(25, 25, 24, Math.PI * 1.5, Math.PI * diff);
        counter.stroke();

        if (elapsedTime === 90) {
        }
      };
      fillCounter();
    };
    createArc(elapsedTime);
  }, [elapsedTime, matchStatus]);

  return <canvas height={'50px'} width={'50px'} ref={counterRef}></canvas>;
};

export default CountUpTimer;
