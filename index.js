function predict() {
    var input = document.getElementById('inputImage').files[0];
    var formData = new FormData();
    formData.append('file', input);
    fetch('https://vash2626.github.io/Footwear-Classification/', {
          method: 'POST',
          body: formData
          })
      .then(response => response.text())
      .then(data => {
            document.getElementById('predictionResult').innerText = data;
            })
      .catch(error => {
        console.error('Error:', error);
            });
        }
