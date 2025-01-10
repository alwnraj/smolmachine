let fileInput = document.getElementById('fileInput')
let imageContainer = document.getElementById('imageContainer')
let message  = document.getElementById('message, ')
let labelInput = document.getElementById('labelInput')
let addButton = document.getElementById('addButton')
let trainButton = document.getElementById('trainButton')
let predictButton = document.getElementById('predictButton')

let featureExtractor;
let classifier;
let uploadImages = [];

//adding images
function loadImages(event) {
    imageContainer.innerHTML = "";
    uploadImages = [];
    const files = event.target.files; /*  event.target.files is a special property that contains
    a list of files selected by the user. */

    if (files.length === 0){
        message.innerHTML = "Please input files, you have not selected any!";
        addButton.disabled = false;
        return;
    }

    for(let i=0; i<files.length; i++){
        let file = files[i]
        const img = document.createElement("img");
        img.src = createObjectURL(file)
        img.onload = () => URL.revokeObjectURL(img.src) //unloads the image from the browswer memory
        imageContainer.appendChild(img)
        uploadImages.push(img)
    }

    message.innerHTML = `${files.length} images have been uploaded. Please add labels and train them.`
    addButton.disabled = false;
}

function setUpModel(){

}

function modelLoaded(){
    message.innerHTML = "Model Loaded. Please add imags and train"
    addButton.addEventListener('click', addImages)
    addButton.addEventListener('click',trainModel)
    addButton.addEventListener('click', predict)
}

function addImages() {
    const label = labelInput.value;
    if (label.trim === ""){
        alert("Please enter a label")
        return 
    }
    uploadImages.forEach((img) => {

    });
    message.innerHTML = `Added ${uploadImages.length} images with label: ${label}`;
    trainButton.disabled = false;

}

function trainModel(){
    message.innerHTML = "Training the model with your images ..."
}

function predict(){
    if (uploadImages === ""){
        message.innerHTML = "Please upload images to predict!"
        return
    }
}

fileInput.addEventListener("change", loadImages);
setUpModel();
