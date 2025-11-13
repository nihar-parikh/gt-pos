export type AppConfig = {
  mode: string;
  couchdbUrl: string | null;
  database: string | null;
  host: string | null;
  username: string | null;
  password: string | null;
  posId: string | null;
};

export const loadConfig = async (): Promise<AppConfig | null> => {
  const platform = import.meta.env.VITE_PLATFORM_MODE;

  if (platform === 'electron') {
    const { ipcRenderer } = window.require('electron');
    const config = await ipcRenderer.invoke('load-config');
    return config;
  } else if (platform === 'capacitor') {
    const { Filesystem, Directory } = await import('@capacitor/filesystem');

    try {
      const result = await Filesystem.readFile({
        path: 'config.json',
        directory: Directory.Documents,
      });
      if (typeof result.data === 'string') {
        return JSON.parse(result.data);
      } else if (result.data instanceof Blob) {
        const text = await result.data.text();
        return JSON.parse(text);
      } else {
        throw new Error('Unknown data type for config file');
      }
    } catch (err) {
      console.warn('Config not found or error reading:', err);
      return null;
    }
  } else {
    // Web fallback: use localStorage
    const couchdbUrl = localStorage.getItem('couchdb_url');
    if (!couchdbUrl) return null;

    return {
      mode: localStorage.getItem('dbMode') || 'http',
      couchdbUrl,
      database: localStorage.getItem('couchdb_db'),
      host: localStorage.getItem('host'),
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      posId: localStorage.getItem('pos_id'),
    };
  }
};

export const setConfig = async (): Promise<void> => {
  const config = await loadConfig();
  if (!config) {
    console.warn('No configuration found, using defaults');
    return;
  }
  localStorage.setItem('couchdb_url', config.couchdbUrl ?? '');
  localStorage.setItem('couch_db', config.database ?? '');
  localStorage.setItem('host', config.host ?? '');
  localStorage.setItem('username', config.username ?? '');
  localStorage.setItem('password', config.password ?? '');
  localStorage.setItem('pos_id', config.posId ?? '');
  localStorage.setItem('dbMode', config.mode ?? '');
};
