import { contextBridge, ipcRenderer } from 'electron';
import { machineIdSync } from 'node-machine-id';

contextBridge.exposeInMainWorld('electronAPI', {
  getDeviceId: () => machineIdSync(),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
});
