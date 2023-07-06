const fileInput = document.querySelector("#file-input");
const fileList = document.querySelector("#file-list");
const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');

fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);

  files.forEach((file) => {
    const fileItem = document.createElement("li");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
      <h5 class="file-name">${file.name}</h5>
      <p class="file-type">${file.type}</p>
      <small class="file-size">${file.size / 1000} KB</small>
    `;

    fileList.appendChild(fileItem);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const fileData = e.target.result;
      savedFiles.push(fileData);
      localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
    };
  });
});
