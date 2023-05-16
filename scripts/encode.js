//function to encode text  
function encode() {
    const imageInput = document.getElementById('imageInput');
    const messageInput = document.getElementById('messageInput');
    const outputDiv = document.getElementById('output');
  
    const imageFile = imageInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
  
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const binaryMessage = textToBinary(messageInput.value);
        let messageIndex = 0;
  
        for (let i = 0; i < pixels.length; i += 4) {
          if (messageIndex >= binaryMessage.length) break;
  
          const pixel = pixels.subarray(i, i + 4);
  
          for (let j = 0; j < 3; j++) {
            if (messageIndex >= binaryMessage.length) break;
            pixel[j] = (pixel[j] & 0xFE) | Number(binaryMessage[messageIndex]);
            messageIndex++;
          }
  
          pixels.set(pixel, i);
        }
  
        context.putImageData(imageData, 0, 0);
  
        const encodedImage = document.createElement('img');
        encodedImage.src = canvas.toDataURL();
        outputDiv.innerHTML = '';
        outputDiv.appendChild(encodedImage);
  
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = 'encoded_image.png';
        downloadLink.innerText = 'Download Image';
        //outputDiv.appendChild(downloadLink);
      };
  
      image.src = e.target.result;
    };
  
    reader.readAsDataURL(imageFile);
}
  
  
  
  
  
  
  
    