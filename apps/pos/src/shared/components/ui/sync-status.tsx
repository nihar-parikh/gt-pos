import eventBus from '@gtpos/core/event-bus';
import { useEffect, useState } from 'react';

export const SyncStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handler = (status: unknown) => {
      setIsOnline(Boolean(status));
    };
    eventBus.on('network-status', handler);
    return () => {
      eventBus.off('network-status', handler);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-2 right-2 px-3 py-1 rounded-full text-xs ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
    >
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
};
