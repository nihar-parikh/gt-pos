import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface OTPTimerProps {
  initialSeconds?: number;
  onResend: () => void;
  className?: string;
}

const OTPTimer = forwardRef(
  ({ initialSeconds = 60, onResend, className = '' }: OTPTimerProps, ref) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(true);

    // 🔹 expose methods to parent (reset timer)
    useImperativeHandle(ref, () => ({
      reset() {
        setSeconds(initialSeconds);
        setIsRunning(true);
      },
      stop() {
        setIsRunning(false);
      },
    }));

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      if (isRunning && seconds > 0) {
        interval = setInterval(() => setSeconds((s) => s - 1), 1000);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isRunning, seconds]);

    const handleResend = () => {
      onResend();
      setSeconds(initialSeconds);
      setIsRunning(true);
    };

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;

    return (
      <div className={`flex justify-start ${className}`}>
        <div className="text-white"> Didn't receive the code?</div>
        {isRunning && seconds > 0 ? (
          <p className="text-white text-sm sm:text-base ms-3">
            Resend OTP in{' '}
            <span className="font-semibold">{formattedTime}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="cursor-pointer ms-3 text-white underline"
          >
            Click to resend
          </button>
        )}
      </div>
    );
  }
);

OTPTimer.displayName = 'OTPTimer';
export default OTPTimer;
