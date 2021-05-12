const { desktopCapturer } = require('electron')

document.getElementById('screenshot-button').addEventListener('click', () => {

    desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } }, (error, sources) => {
        console.log(sources)
        document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
    })

})