import { DbMode } from '@gtpos/core/db/src/config';
import { useState } from 'react';
import { useSetup } from './use-setup';

export const SetupScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [mode, setMode] = useState<DbMode>('http');
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [posId, setPosId] = useState('');

  const { handleSubmit } = useSetup();
  const platform = import.meta.env.VITE_MODE;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Configuration</h2>

        <div className="flex flex-col gap-4 items-start mb-6">
          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="radio"
              value="pouchdb"
              checked={mode === 'pouchdb'}
              onChange={() => setMode('pouchdb')}
              className="accent-blue-600 w-5 h-5"
            />
            <span>
              Use <strong>PouchDB</strong> (Embedded)
            </span>
          </label>

          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="radio"
              value="http"
              checked={mode === 'http'}
              onChange={() => setMode('http')}
              className="accent-blue-600 w-5 h-5"
            />
            <span>
              Use <strong>Direct CouchDB</strong> (On LAN){' '}
              <small className="text-xs">(Multi device)</small>
            </span>
          </label>
        </div>

        {/* Shared POS ID input */}
        <div className="text-left mb-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">POS ID</label>
            <input
              type="text"
              value={posId}
              onChange={(e) => setPosId(e.target.value)}
              placeholder="e.g. POS-001"
              className="w-full border px-3 py-2 rounded border-gray-300"
            />
          </div>
        </div>

        {mode === 'http' && (
          <div className="text-left mb-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                CouchDB Host
              </label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="e.g. 192.168.1.121:5984"
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Admin"
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Database Name
              </label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                placeholder="e.g. store1db"
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>
          </div>
        )}

        {/* Host info line */}

        <div className="text-green-700 font-medium text-sm mt-2">
          Connected with{' '}
          <span className="font-semibold">
            {import.meta.env.VITE_DB_HOST_ADDRESS}
          </span>{' '}
          cloud CouchDB
        </div>

        <button
          onClick={() =>
            handleSubmit(
              mode,
              host,
              username,
              password,
              database,
              posId,
              platform,
              onComplete
            )
          }
          className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
