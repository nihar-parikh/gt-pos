import { DbMode, saveDbMode } from '@gtpos/core/db/src/config';

export type ConfigData = {
  couchdbUrl: string;
  couchDb: string;
  mode: DbMode;
  host: string;
  username: string;
  password: string;
  database: string;
  posId: string;
};

declare global {
  interface Window {
    electronAPI?: {
      saveConfig: (configData: ConfigData) => Promise<void>;
    };
  }
}

export const useSetup = () => {
  const handleSubmit = async (
    mode: DbMode,
    host: string,
    username: string,
    password: string,
    database: string,
    posId: string,
    platform: string,
    onComplete: () => void
  ) => {
    const couchdbUrl = `http://${username}:${password}@${host}`;
    const couchDb = database;

    const configData = {
      couchdbUrl,
      couchDb,
      mode,
      host,
      username,
      password,
      database,
      posId,
    };

    try {
      if (platform === 'electron' && window?.electronAPI) {
        //Windows: C:\Users\<username>\AppData\Roaming\<YourAppName>\config.json
        //Linux: /home/<username>/.config/<YourAppName>/config.json
        await window.electronAPI?.saveConfig(configData);
      } else if (platform === 'capacitor') {
        const { Filesystem, Directory } = await import('@capacitor/filesystem');
        //Android: /data/data/<your.app.id>/files/
        await Filesystem.writeFile({
          path: 'config.json',
          data: JSON.stringify(configData),
          directory: Directory.Documents,
        });
      } else {
        // Web fallback: localStorage
        if (mode === 'http') {
          const connectionString = `http://${username}:${password}@${host}`;
          localStorage.setItem('couchdb_url', connectionString);
          localStorage.setItem('couch_db', database);
          localStorage.setItem('host', host);
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        }
        localStorage.setItem('pos_id', posId);
      }

      saveDbMode(mode);
      onComplete();
    } catch (err) {
      console.error('Failed to save config:', err);
    }
  };
  return {
    handleSubmit,
  };
};
