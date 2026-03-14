
// Loading Spinner

const spinner = document.getElementById('loadingSpinner');
const pdfViewer = document.getElementById('pdfViewer');

setTimeout(() => {
    spinner.classList.add('hidden');
}, 3000);

pdfViewer.addEventListener('load', () => {
    spinner.classList.add('hidden');
});
