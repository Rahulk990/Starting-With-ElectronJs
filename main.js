const { app, BrowserWindow } = require('electron')

// Multiple Windows
let mainWindow, secondWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true },

    // To hide the window initially
    show: false
  })

  secondWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: { nodeIntegration: true },

    // To create a Child Window
    parent: mainWindow,

    // To attach the child Window to the parent Window
    model: true,

    // To create frameless window
    frame: false
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondWindow.loadURL('https://www.google.co.in/')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Graceful loading
  mainWindow.once('ready-to-show', mainWindow.show);

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  secondWindow.on('closed', () => {
    secondWindow = null
  })
  
}

// App Before Quit
app.on('before-quit', () => {
  console.log("Before Quitting");
})

// Window on Blur
app.on('browser-window-blur', () => {
  console.log("Browser window Unfocused");
})

// Window on Focus
app.on('browser-window-focus', () => {
  console.log("Browser window focused");
})

// App on Ready
app.on('ready', () => {

  // Various common locations for storing data
  console.log(app.getPath('desktop'))
  console.log(app.getPath('userData'))

  // Creating Window
  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
