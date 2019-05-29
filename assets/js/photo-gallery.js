let galleryLightbox = document.getElementById("lightboxGallery")
let galleryDataUrl = galleryLightbox.dataset.json
let galleryData = {}

let galleryThumbs = document.querySelectorAll(".galleryItem")

for(let i = 0; i < galleryThumbs.length; i++){
    let currentPhoto = galleryThumbs[i].dataset.photo
    galleryThumbs[i].addEventListener("click", function(){
        openGallery(currentPhoto)
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
    console.log(galleryData.photos[photoNum])
}