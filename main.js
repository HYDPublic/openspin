const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768 + 22,
    webPreferences: { plugins: true }
  });

  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function loadPepperFlashPlugin() {
  let pluginName;
  switch (process.platform) {
    case 'win32':
      pluginName = 'pepflashplayer.dll';
      break;
    case 'darwin':
      pluginName = 'PepperFlashPlayer.plugin';
      break;
    case 'linux':
      pluginName = 'libpepflashplayer.so';
      break;
    default:
      pluginName = 'unknown';
      break;
  }

  let pluginPath = path.join(process.cwd(), 'plugins', 'PepperFlash', process.arch, process.platform, pluginName);
  app.commandLine.appendSwitch('ppapi-flash-path', pluginPath);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // Quit the app even on macOS where typically applications
  // and their menu bar stay alive until explicitly exited.
  app.quit();
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

loadPepperFlashPlugin();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
