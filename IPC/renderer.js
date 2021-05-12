const { remote, ipcRenderer } = require('electron');

let i = 1
setInterval(() => {
    console.log(i)
    i++
}, 1000)

document.getElementById('btn').addEventListener('click', () => {
    ipcRenderer.send('channel1', 'Hello from IPC');

    let response = ipcRenderer.sendSync('sync-message', 'Waiting for response')
    console.log(response)
})

ipcRenderer.on('response', (e, args) => {
    console.log(args);
})