
// Full screen button

const container = document.getElementById('pdfContainer');
const iframe = document.getElementById('pdfViewer');
const btn = document.getElementById('fullscreenBtn');

btn.addEventListener('click', async () => {
    try {
        if (iframe.requestFullscreen) {
            await iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { // Safari/iOS
            await iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            await iframe.mozRequestFullScreen();
        } else if (container.requestFullscreen) {
            await container.requestFullscreen();
        }
        document.body.classList.add('fullscreen-active');
    } catch (err) {}
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen-active');
    }
});


// Loading Spinner

const spinner = document.getElementById('loadingSpinner');
const pdfViewer = document.getElementById('pdfViewer');

setTimeout(() => {
    spinner.classList.add('hidden');
}, 3000);

pdfViewer.addEventListener('load', () => {
    spinner.classList.add('hidden');
});
