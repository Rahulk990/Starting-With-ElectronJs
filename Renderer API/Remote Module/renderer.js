// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { remote } = require('electron');
console.log(remote);


// Dialog Module
const { dialog } = remote;
const dialogButton = document.getElementById('dialog-button');
dialogButton.addEventListener('click', e => {
    console.log(e);
    dialog.showMessageBox({ message: 'Dialog Box from Renderer Process' });
})


// Browser Window Module
const { BrowserWindow } = remote;
const winButton = document.getElementById('new-window');
winButton.addEventListener('click', e => {
    console.log(e);
    let secondWindow = new BrowserWindow({
        width: 500, height: 500
    })
    secondWindow.loadFile('index.html');
})


// Get Global
console.log(remote.getGlobal('var'));


// Accessing Current Window
const win = remote.getCurrentWindow();
const maxButton = document.getElementById('max-window');
maxButton.addEventListener('click', e => {
    console.log(e);
    win.maximize();
})