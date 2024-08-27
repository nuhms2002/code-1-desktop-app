import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import sqlite3 from 'sqlite3'


const sqlite = sqlite3.verbose();



function initializeDatabase () {
  const dbPath = join(app.getPath('userData'), 'code1sqldatabase.db');
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening Database');
    } else {
      console.log ('connected to the sqlite3 Database :)');
    }
  });

   // Example: Create a table if it doesn't exist
   db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS voucher (
    id SERIAL PRIMARY KEY,
    job_date DATE NOT NULL,
    passenger_name VARCHAR(100) NOT NULL,
    passenger_phone VARCHAR(20) NOT NULL,
    pick_up_time TIME NOT NULL,
    appointment_time TIME NOT NULL,
    trip_type VARCHAR(20) CHECK (trip_type IN ('one-way', 'round-trip', 'multiple')) NOT NULL,
    start_address VARCHAR(255) NOT NULL,
    drop_off_address VARCHAR(255) NOT NULL,
    second_drop_off_address VARCHAR(255),
    driver VARCHAR(100) NOT NULL,
    total_charge DECIMAL(10, 2) NOT NULL
);`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created or already exists.');
        }
      }
    );
  });

  return db;

}

const db = initializeDatabase();

// IPC handler to get job data from the database
ipcMain.handle('get-jobs', async (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM voucher', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});



function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.handle('get-app-path', (event) => {
    return app.getAppPath(); // You can send any relevant path information here
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
