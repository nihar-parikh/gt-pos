import { wrapPowerSyncWithDrizzle } from '@powersync/drizzle-driver';
import { PowerSyncContext } from '@powersync/react';
import { PowerSyncDatabase } from '@powersync/web';
import Logger from 'js-logger';
import React, { Suspense } from 'react';
import CircularProgress from '../components/circular-progress';
import { AppSchema, drizzleSchema } from '../core/app-schema';
import { SyncConnector } from '../core/sync-connector';

// export const db = new PowerSyncDatabase({
//   database: {
//     dbFilename: 'example.db'
//   },
//   schema: AppSchema,
//   logger: Logger
// });

//Using VFS for database storage
const dbName = import.meta.env.VITE_SQLITE_DB_NAME ?? 'gtpos.db';

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  // database: new WASQLiteOpenFactory({
  //   dbFilename: dbName,
  //   vfs: WASQLiteVFS.OPFSCoopSyncVFS,
  //   flags: {
  //     enableMultiTabs: typeof SharedWorker !== 'undefined'
  //   }
  // }),
  database: {
    dbFilename: dbName,
  },
  logger: Logger,
  flags: {
    enableMultiTabs: typeof SharedWorker !== 'undefined',
  },
});

// This is the DB you will use in queries
export const db = wrapPowerSyncWithDrizzle(powerSyncDb, {
  schema: drizzleSchema,
});

// Make db accessible on the console for debugging
declare global {
  interface Window {
    db: typeof db;
    _powersync: PowerSyncDatabase;
  }
}

window.db = db;

// if(import.meta.env.VITE_IS_CAPACITOR ==false) {
// const root = navigator.storage.getDirectory();
// console.log("Root directory", root)
// }

const ConnectorContext = React.createContext<SyncConnector | null>(null);
export const useConnector = () => React.useContext(ConnectorContext);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  const [connector] = React.useState(new SyncConnector());

  // drizzle-wrapped db used for queries
  // const [dbInstance] = React.useState(db);

  // powerSyncDb is the raw PowerSyncDatabase instance
  React.useEffect(() => {
    // Linting thinks this is a hook due to it's name
    Logger.useDefaults();
    Logger.setLevel(Logger.DEBUG);

    // For console testing purposes
    window._powersync = powerSyncDb;

    powerSyncDb.init();
    powerSyncDb.connect(connector);
  }, [powerSyncDb, connector]);

  return (
    <Suspense fallback={<CircularProgress progress={65} />}>
      <PowerSyncContext.Provider value={powerSyncDb}>
        <ConnectorContext.Provider value={connector}>
          {children}
        </ConnectorContext.Provider>
      </PowerSyncContext.Provider>
    </Suspense>
  );
};

export default SystemProvider;
