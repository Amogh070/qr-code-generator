/*1. index.html file code:*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>QR Code Generator</title>
</head>
<body>
    <div class="box">
        <div class="qr-header">
            <h1>Generate QR Code</h1>
            <input type="text" placeholder="Type your text/URL" id="qr-text">
            <div>
                <label for="sizes">Select Size:</label>
                <select id="sizes">
                    <option value="100">100x100</option>
                    <option value="200">200x200</option>
                    <option value="300">300x300</option>
                    <option value="400">400x400</option>
                    <option value="500">500x500</option>
                    <option value="600">600x600</option>
                    <option value="700">700x700</option>
                    <option value="800">800x800</option>
                    <option value="900">900x900</option>
                    <option value="1000">1000x1000</option>
                </select>
            </div>
            <div id="error-message" class="error-message" style="display: none;">Please provide input in the input box!</div>
        </div>
        <div class="qr-body"></div>
        <div class="qr-footer">
            <button id="generateBTN">Generate</button>
            <button id="downloadBTN">Download</button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="scripts.js"></script>
</body>
</html>


/*2. style.css file code:*/
:root {
  --bcg-color: #f4f4f4; 
  --primary-color: #ffffff; 
  --border-radius: 8px; 
  --secondry-color: #212121;
  --border-color: #e0e0e0; 
  --button-color: #fb641b; 
  --button-hover-color: #ff8c24; 
  --error-color: #ff4d4d; 
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bcg-color);
}

.box {
    background-color: var(--primary-color);
    padding: 30px;
    width: 450px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.qr-header h1 {
    font-size: 28px;
    text-align: center;
    color: var(--secondry-color);
    margin-bottom: 24px;
}

.qr-header input, 
.qr-header select {
    width: 90%;
    padding: 4px; 
    margin-bottom: 12px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 14px; 
    outline: none;
    transition: border-color 0.3s; 
}

.qr-header label {
    font-size: 20px;
    font-weight: bold;
}

.qr-header div {
    display: flex;
    justify-content: space-between;
}

.qr-body {
    display: flex;
    justify-content: center;
    margin-bottom: 20px; 
}

.qr-footer {
    display: flex;
    justify-content: center;
}

.qr-footer button {
    background-color: var(--button-color);
    color: white; 
    border: none;
    padding: 12px 20px;
    margin: 0 5px;
    border-radius: var(--border-radius);
    cursor: pointer; 
    transition: background-color 0.3s; 
    font-weight: bold; 
}

.qr-footer button:hover {
    background-color: var(--button-hover-color); 
}

.input-error {
    border-color: var(--error-color); 
}

.error-message {
    color: var(--error-color);
    text-align: center;
    margin-top: 10px;
}

/*3. scripts.js file code:*/

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
/*Happy coding!*/
/*Amogha Mahadev*/
