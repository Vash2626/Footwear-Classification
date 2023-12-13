// Function to load the model and perform prediction
async function predict() {
    // Create a session
    const session = await ort.InferenceSession.create('path/to/your/model.onnx');

    // Create a tensor from your input data
    const inputTensor = new ort.Tensor('float32', new Float32Array([1, 2, 3, 4]), [2, 2]);

    // Feed the input tensor to the model
    const inputFeed = { 'input_name': inputTensor };

    // Run the model with the provided input
    const outputMap = await session.run(inputFeed);

    // Read the output tensor from the output map
    const outputTensor = outputMap.get('output_name');

    // Convert the output tensor to a JavaScript array
    const outputArray = await outputTensor.data();

    // Print the prediction result
    console.log('Prediction:', outputArray);
}

// Call the predict function
predict();
