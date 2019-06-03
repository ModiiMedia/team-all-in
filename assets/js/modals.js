////// submit a photo modal //////
let photoModalTriggers = document.querySelectorAll(".submitPhotoButton")
let photoModal = document.querySelector("#submitPhotoModal")
let photoModalClosers = document.querySelectorAll(".photoModalCloser")


// opening and closing the modal
for (let i = 0; i < photoModalTriggers.length; i++){
    let button = photoModalTriggers[i]
    button.addEventListener("click", function(){
        openSubmitPhotoModal();
    })
}
for (let i = 0; i < photoModalClosers.length; i++){
    let button = photoModalClosers[i]
    button.addEventListener("click", function(){
        closeSubmitPhotoModal();
    })
}
function openSubmitPhotoModal(){
    photoModal.classList.add("is-active")
    // this function is in navigation.js 
    // include navigation.js before this file or it wont work
    htmlNoScroll();
}
function closeSubmitPhotoModal(){
    photoModal.classList.remove("is-active")
    // this function is in navigation.js 
    // include navigation.js before this file or it wont work
    htmlAllowScroll();
}


// image upload field
let imageUploadField = document.getElementById("imageUploadField");
imageUploadField.onchange = function(){
    if(imageUploadField.files.length > 0)
    {
      document.getElementById('imageUploadFilename').innerHTML = imageUploadField.files[0].name;
    }
};