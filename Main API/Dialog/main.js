const { app, BrowserWindow, dialog } = require('electron')

let mainWindow;

function createWindow() {

  // Basic Methods
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => { mainWindow = null })

  // Setting up Dialogs
  // Dialogs are Blocking in Nature
  mainWindow.webContents.on('did-finish-load', () => {

    dialog.showOpenDialog(mainWindow, {
      buttonLabel: 'Select a File',
      defaultPath: app.getPath('desktop'),
      properties: ['multiSelections', 'openFile', 'openDirectory']
    }, filepaths => {
      console.log(filepaths)
    })

    const answers = ['Yes Ofcourse', 'Not at All', 'Maybe']
    dialog.showMessageBox({
      title: 'Message Box',
      message: 'Please select an option',
      buttons: answers
    }, response => {
      console.log(`User selected: ${answers[response]}`)
    })
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
