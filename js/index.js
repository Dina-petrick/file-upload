const fileInput = document.querySelector("#file-input");
const fileList = document.querySelector("#file-list");
let savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
const previewImg = document.querySelector("#preview");
const previewContainer = document.querySelector(".preview-container");


fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    saveToLocalStorage(files);
});

window.onload = function () {
    if (savedFiles !== null) {
        displayItemsFromLocalStorage();
    }
}

// create element
function createFileItemElement(file, index) {
    const fileItem = document.createElement("li");
    fileItem.setAttribute("data-index", index);
    fileItem.className = "file-item";
    fileItem.innerHTML = `
      <h5 class="file-name display-file">${file.name}</h5>
      <p class="file-type display-file">${file.type}</p>
      <small class="file-size display-file">${file.size / 1000} KB</small>
      <button class="preview-open-btn">open</button>
    `;
    return fileItem;
}


  function displayItemsFromLocalStorage() {
    savedFiles.forEach((file, index) => {
      const fileItem = createFileItemElement(file, index);
      fileList.appendChild(fileItem);
    });
  }
  

  function saveToLocalStorage(files){
    files.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) =>{
            const fileData = e.target.result;
            const object = {};
            object.name = file.name;
            object.size = file.size;
            object.type = file.type;
            object.dataUri = fileData;
            savedFiles.push(object);
            localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
            const fileItem = createFileItemElement(object, savedFiles.length - 1);
            fileList.appendChild(fileItem);
        }
    })
  }

document.body.addEventListener("click", (e) => {
        const selectFileItem = e.target.closest(".file-item");
        if (selectFileItem) {
        const index = selectFileItem.getAttribute("data-index");
        const dataUri = savedFiles[index].dataUri;
        if(e.target.className === "preview-open-btn"){
            previewContainer.style.display = 'block';
            previewImg.src = dataUri;
        }
        }

        if(e.target.className === "preview-close-btn"){
            previewContainer.style.display = 'none';
            previewImg.src = "";
        }
})





