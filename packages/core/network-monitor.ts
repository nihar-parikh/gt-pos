import eventBus from './event-bus';

export const monitorNetwork = () => {
  window.addEventListener('online', () =>
    eventBus.emit('network-status', true)
  );
  window.addEventListener('offline', () =>
    eventBus.emit('network-status', false)
  );
};
