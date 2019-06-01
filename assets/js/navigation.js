let secondaryNavTrigger = document.querySelectorAll(".openMobileSecondary");
let secondaryNavCloser = document.querySelectorAll(".closeMobileSecondary");
let secondaryMenu = document.querySelector("#secondaryNav");
let documentHTML = document.querySelector("html")

for (let i = 0; i < secondaryNavTrigger.length; i++){
    secondaryNavTrigger[i].addEventListener("click", function(){
        openSecondaryNavMenu();
    })
}

for (let i = 0; i < secondaryNavCloser.length; i++){
    secondaryNavCloser[i].addEventListener("click", function(){
        closeSecondaryNavMenu();
    })
}

function openSecondaryNavMenu(){
    secondaryMenu.classList.add("show")
    documentHTML.classList.add("noScroll")
}

function closeSecondaryNavMenu(){
    secondaryMenu.classList.remove("show")
    documentHTML.classList.remove("noScroll")
}