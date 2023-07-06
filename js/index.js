const fileInput = document.querySelector("#file-input");
const fileList = document.querySelector("#file-list");
let savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || []
const previewImg = document.querySelector("#preview");


fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    displayContent(files);
    saveToLocalStorage(files);
});


//  Goal: Display the data onload if the value is available
// step 1: check onload. if data is available
// step 2 : we need to display the data in html
window.onload = function () {
    if (savedFiles !== null) {
        displayContent(savedFiles);
    }
}

// goal make func for displaying content
function displayContent(arrToDisplay) {
    arrToDisplay.forEach((file, index) => {
        const fileItem = document.createElement("li");
        fileItem.setAttribute("data-index", index);
        fileItem.className = "file-item";
        fileItem.innerHTML = `
            <h5 class="file-name">${file.name}</h5>
            <p class="file-type">${file.type}</p>
            <small class="file-size">${file.size / 1000} KB</small>
            `;

        fileList.appendChild(fileItem);
    })
}

function saveToLocalStorage(files) {
    console.log("before for each",savedFiles);

    console.log(typeof savedFiles);
    files.forEach(file => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            const fileData = e.target.result;
            console.log("after for each",savedFiles);
            const object = {};
            object.name = file.name;
            object.size = file.size;
            object.type = file.type;
            object.dataUri = fileData;
            savedFiles.push(object);
            localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
        };
    })
}

document.body.addEventListener("click", (e) => {
    if (e.target.className === "file-item") {
        // step 1: getting index 
        const index = e.target.getAttribute("data-index");
        //step 2: we need to get the dataurl from the local storage
        const dataUri = savedFiles[index].dataUri;
        // step 3: we need to preview the item
        previewImg.src = dataUri;
    }
})

