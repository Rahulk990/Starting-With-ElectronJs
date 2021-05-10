const { app, BrowserWindow, Tray } = require('electron')

let mainWindow;

// Creating and Configuring Tray Instance 
function createTray() {

  tray = new Tray('trayTemplate@2x.png')
  tray.setToolTip('Tray details')

  tray.on('click', e => {
    if (e.shiftKey) {
      app.quit()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })

}

function createWindow() {

  // Basic Methods
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => { mainWindow = null })

  // Creating Tray Instance
  createTray();

}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
