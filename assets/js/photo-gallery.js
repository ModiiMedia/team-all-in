let htmlObject = document.querySelector("html")
let galleryLightbox = document.getElementById("lightboxGallery")
let nextButton = document.getElementById("nextButton");
let previousButton = document.getElementById("previousButton");
let lightboxNavButtons = document.querySelectorAll(".lightboxNavButton")
let lImage = document.getElementById("lightboxImage");
let lTitle = document.getElementById("lightboxTitle");
let lDescription = document.getElementById("lightboxDescription");
let lContent = document.getElementById("lightboxContent");
let loadingImage = document.getElementById("loadingImage")

let galleryDataUrl = galleryLightbox.dataset.json
let galleryData = {}

let galleryThumbs = document.querySelectorAll(".galleryItem")

// items that close the lightbox (whatever has the class "lightboxClose"
// will close the lightbox)
let lightboxClosers = document.querySelectorAll(".lightboxClose")

// add event listener to each gallery thumbnail
for(let i = 0; i < galleryThumbs.length; i++){
    let currentPhoto = galleryThumbs[i].dataset.photo
    galleryThumbs[i].addEventListener("click", function(){
        // open photo of selected thumbnail
        openGallery(currentPhoto);
    })
}

for(let i = 0; i < lightboxClosers.length; i++){
    lightboxClosers[i].addEventListener("click", function(){
        closeGallery();
    })
}

for(let i = 0; i < lightboxNavButtons.length; i++){
    let button = lightboxNavButtons[i]
    button.addEventListener("click", function(){
        let photoNum = button.dataset.photo
        openGallery(Number(photoNum))
    })
}

loadGalleryData(galleryDataUrl)

function loadGalleryData(url){
    let req = new XMLHttpRequest();
    req.open("GET", url)
    req.addEventListener("load", function(){
        galleryData = JSON.parse(this.responseText)
    })
    req.send();
}

function openGallery(photoNum){
    resetLightboxNav();
    lImage.src = '';
    galleryLightbox.classList.add("open");
    htmlObject.classList.add("lightboxOpen");
    let currentPhoto = galleryData.photos[Number(photoNum)];
    lImage.src = currentPhoto.url;
    lTitle.innerHTML = currentPhoto.title;
    lContent.innerHTML = currentPhoto.description

    // load small low quality version of photo for background
    let bgImage = currentPhoto.url.replace("w_800", "w_5")
    bgImage = bgImage.replace("q_70", "q_5")
    loadingImage.style.backgroundImage = `url(${bgImage})`

    // set previous button
    if (Number(photoNum) > 0){
        previousButton.dataset.photo = Number(photoNum) - 1;
    } else {
        previousButton.dataset.photo = galleryData.photos.length - 1;
    }

    // set next button 
    if (Number(photoNum) === galleryData.photos.length - 1) {
        nextButton.dataset.photo = 0;
    } else {
        nextButton.dataset.photo = Number(photoNum) + 1;
    }
}

function closeGallery(){
    galleryLightbox.classList.remove("open");
    htmlObject.classList.remove("lightboxOpen")
    // reset image
    lImage.src = ""
    // reset nav buttons
    resetLightboxNav();
}

function resetLightboxNav(){
    for(let i = 0; i < lightboxNavButtons.length; i++){
        let button = lightboxNavButtons[i]
        button.classList.remove("hide");
        button.dataset.photo = null
    }
}