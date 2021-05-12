const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow;

function createWindow() {

  // Basic Methods
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => { mainWindow = null })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('response', "From the webContents")
  })
}

ipcMain.on('sync-message', (e, args) => {
  console.log(args)

  setTimeout(() => {
    e.returnValue = 'A sync response from the main process'
  }, 2000)
})

ipcMain.on('channel1', (e, args) => {
  console.log(args);
  setTimeout(() => {
    e.sender.send('response', "Message Received");
  }, 4000)
})

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
