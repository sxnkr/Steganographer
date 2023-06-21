function decode() {
    const encodedImageInput = document.getElementById('encodedImageInput');
    const outputDiv = document.getElementById('output');
  
    const encodedImageFile = encodedImageInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const encodedImage = new Image();
      encodedImage.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = encodedImage.width;
        canvas.height = encodedImage.height;
        context.drawImage(encodedImage, 0, 0);
  
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let binaryMessage = '';
  
        for (let i = 0; i < pixels.length; i += 4) {
          const pixel = pixels.subarray(i, i + 4);
  
          for (let j = 0; j < 3; j++) {
            binaryMessage += (pixel[j] & 0x01);
          }
        }
  
        const decodedMessage = binaryToText(binaryMessage);
        const cleanedMessage = decodedMessage.replace(/[^a-zA-Z0-9 ]/g, '');
        outputDiv.innerHTML = '';
        outputDiv.innerHTML = '<textarea class="form-control" id="decodedText" placeholder="Decoded text" style="margin-bottom: 10px;">' + cleanedMessage + '</textarea><button class="btn btn-primary" id="copyButton" onclick="copyText()" style="margin-left: 10px;">Copy Text</button>';
  
        const copyButton = document.getElementById('copyButton');
        copyButton.style.display = 'inline-block';
      };
  
      encodedImage.src = e.target.result;
    };
  
    reader.readAsDataURL(encodedImageFile);
}