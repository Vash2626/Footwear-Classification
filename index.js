document.getElementById('predictButton').addEventListener('click', predict);

async function predict() {
    const input = document.getElementById('inputImage').files[0];

    if (!input) {
        alert('Please select an image.');
        return;
    }

    const session = new onnx.InferenceSession();
    await session.loadModel('mymodel.onnx'); 

    const tensor = new onnx.Tensor(new Float32Array(3 * 224 * 224), 'float32', [1, 3, 224, 224]);
    const imageData = getImageData(input);
    tensor.data.set(imageData);

    const inputMap = {};
    inputMap[session.inputNames[0]] = tensor;
    const outputMap = await session.run(inputMap);
    
    const predictions = outputMap.values().next().value.data;

    document.getElementById('predictionResult').innerText = `Predictions: ${predictions}`;
}

function getImageData(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const image = new Image();
            image.src = event.target.result;
            image.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = 224;
                canvas.height = 224;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, 224, 224);
                const imageData = ctx.getImageData(0, 0, 224, 224).data;
                resolve(Array.from(imageData));
            };
        };
        reader.readAsDataURL(file);
    });
}
