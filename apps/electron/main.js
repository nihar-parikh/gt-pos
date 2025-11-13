import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  //win.loadURL("http://localhost:3000");
  // For production build
  const indexPath = path.join(__dirname, 'web', 'dist', 'index.html');
  win.loadFile(indexPath);

  // win.webContents.openDevTools();

  win.webContents.on('did-finish-load', () => {});
}

ipcMain.handle('save-config', async (_event, config) => {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(config), 'utf-8');
});

app.whenReady().then(createWindow);
