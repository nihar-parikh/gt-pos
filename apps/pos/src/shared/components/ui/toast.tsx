import eventBus from '@gtpos/core/event-bus';
import { useEffect, useState } from 'react';

export const Toast = () => {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (message: string) => {
      setMsg(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setMsg('');
      }, 3000);
    };

    eventBus.on('toast', handler);

    return () => {
      eventBus.off('toast', handler); // unregister the listener on unmount
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded">
      {msg}
    </div>
  );
};
