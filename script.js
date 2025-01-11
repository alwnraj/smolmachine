let fileInput = document.getElementById("fileInput");
let imageContainer = document.getElementById("imageContainer");
let message = document.getElementById("message");
let labelInput = document.getElementById("labelInput");
let addButton = document.getElementById("addButton");
let trainButton = document.getElementById("trainButton");
let predictButton = document.getElementById("predictButton");

let featureExtractor;
let classifier;
let uploadImages = [];

// Adding images
function loadImages(event) {
    imageContainer.innerHTML = "";
    uploadImages = [];
    const files = event.target.files;

    if (files.length === 0) {
        message.innerHTML = "Please input files, you have not selected any!";
        addButton.disabled = true;
        return;
    }

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(img.src); // Unload from memory
        imageContainer.appendChild(img);
        uploadImages.push(img);
    }

    message.innerHTML = `${files.length} images have been uploaded. Please add labels and train them.`;
    addButton.disabled = false;
}

function setUpModel() {
    // Set up the feature extractor with ml5
    featureExtractor = ml5.featureExtractor("mobilenet", modelLoaded);
    classifier = featureExtractor.classification();
}

function modelLoaded() {
    message.innerHTML = "Model Loaded. Please add images and train.";
    addButton.addEventListener("click", addImages);
    trainButton.addEventListener("click", trainModel);
    predictButton.addEventListener("click", predict);
}

function addImages() {
    const label = labelInput.value;
    if (label.trim() === "") {
        alert("Please enter a label.");
        return;
    }

    uploadImages.forEach((img) => {
        // Add image samples
        classifier.addImage(img, label);
    });
    message.innerHTML = `Added ${uploadImages.length} images with label: ${label}.`;
    trainButton.disabled = false;
}

function trainModel() {
    message.innerHTML = "Training the model with your images...";
    classifier.train((lossValue) => {
        if (lossValue) {
            message.innerHTML = `Training... loss value = ${lossValue}`;
        } else {
            message.innerHTML = "Training is complete.";
            predictButton.disabled = false;
        }
    });
}

function predict() {
    if (uploadImages.length === 0) {
        message.innerHTML = "Please upload images to predict!";
        return;
    }

    classifier.classify(uploadImages[0], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            const { label, confidence } = results[0];
            message.innerHTML = `Prediction: ${label} (${(confidence * 100).toFixed(2)}% confidence)`;
        }
    });
}

// Attach event listeners
fileInput.addEventListener("change", loadImages);
setUpModel();
