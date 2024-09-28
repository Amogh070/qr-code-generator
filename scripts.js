const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBTN = document.getElementById('generateBTN');
const downloadBTN = document.getElementById('downloadBTN');
const qrContainer = document.querySelector('.qr-body');
const errorMessage = document.getElementById('error-message'); // Error message.

let qrCodeInstance; // To keep track of the current QR code instance

generateBTN.addEventListener('click', (e) => {
    e.preventDefault();
    if (!qrText.value.trim()) { // Check if input is empty
        showErrorMessage();
    } else {
        hideErrorMessage();
        generateQRCode();
    }
});

function generateQRCode() {
    qrContainer.innerHTML = ''; // Clears the previous QR code
    let size = sizes.value;

    qrCodeInstance = new QRCode(qrContainer, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: '#000',
        colorLight: '#fff',
    });
}

downloadBTN.addEventListener('click', (e) => {
    e.preventDefault();
    const qrCanvas = qrContainer.querySelector('canvas'); // Select the canvas element
    if (!qrCanvas) { // Checking if QR code exists
        alert("Please generate a QR code first.");
        return;
    }

    const imgDataUrl = qrCanvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = imgDataUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink); // Append the link to the body
    downloadLink.click(); // Trigger the download
    document.body.removeChild(downloadLink); // Clean up by removing the link
});

function showErrorMessage() {
    errorMessage.style.display = 'block';  // Show error message
    qrText.classList.add('input-error');   // Highlight input box
}

function hideErrorMessage() {
    errorMessage.style.display = 'none';  // Hide error message
    qrText.classList.remove('input-error'); // Remove input highlight
}
