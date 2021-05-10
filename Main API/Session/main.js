const { app, BrowserWindow, session } = require('electron')

// Multiple Windows
let mainWindow, secondWindow;

function createWindow() {

  // Creating the custom Sessions
  let customSession__Persistent = session.fromPartition('persist:part1')
  let customSession__Memory = session.fromPartition('part1')

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  secondWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: { 
      nodeIntegration: true, 
      // session: customSession   OR  directly
      partition: "persist:part2" 
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();



  // Various Sessions in an App
  let ses = mainWindow.webContents.session
  let defaultSession = session.defaultSession

  console.log(ses, defaultSession)
  console.log(Object.is(ses, defaultSession))



  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  secondWindow.on('closed', () => {
    secondWindow = null
  })
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
