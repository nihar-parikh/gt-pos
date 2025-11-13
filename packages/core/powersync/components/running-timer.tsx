import React, { useState, useEffect } from 'react';

const RunningTimer = ({ title }: { title: string }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  console.log(`Rendering ${title} with seconds:`, seconds);

  return (
    <span>
      {title}: {formatTime(seconds)}
    </span>
  );
};

export default RunningTimer;
