const { app, BrowserWindow, dialog, globalShortcut, Menu, MenuItem } = require('electron')

let mainWindow;

// Defining and Structuring Menu
let mainMenu = Menu.buildFromTemplate([
  {
    label: "Electron",
    submenu: [
      { label: "Item1", enabled: false },
      { label: "Item2", click: () => { console.log("Hello") }, accelerator: "Control+T" },
      { label: "Item3" },
    ]
  }
])


function createWindow() {

  // Basic Methods
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => { mainWindow = null })

  // Registering Shortcut
  globalShortcut.register("Control+Y", () => {
    console.log("Used Pressed Y");
  })

  // Registering Menu
  Menu.setApplicationMenu(mainMenu);

  // Registering Context Menu
  mainWindow.webContents.on('context-menu', () => {
    mainMenu.popup();
  });

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
