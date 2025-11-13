import React, { useEffect, useState } from 'react';

interface LoaderWithTimeProps {
  delay?: number; // Optional delay in milliseconds before showing the loader.
}

const LoaderWithTime: React.FC<LoaderWithTimeProps> = ({ delay = 300 }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dots, setDots] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Start showing the loader after the delay
    const timeoutId = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
  }, [delay]);

  useEffect(() => {
    // Set up the time interval to update the elapsed time every second
    const intervalId = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    // Handle the dot animation: loop over 3 dots
    const dotIntervalId = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500); // Add a dot every 500ms

    return () => clearInterval(dotIntervalId); // Clean up the dot interval
  }, []);

  return (
    <div className="flex flex-col items-center">
      {showLoader ? (
        <>
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
          <p className="text-base font-sans">
            Loading{dots} <span>{elapsedTime}s</span>
          </p>
        </>
      ) : (
        <p className="text-base font-sans">Preparing...</p>
      )}
    </div>
  );
};

// CSS for the spinning animation (use inline style or in your CSS file)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,
  styleSheet.cssRules.length
);

export default LoaderWithTime;
