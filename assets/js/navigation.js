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
    htmlNoScroll();
}

function closeSecondaryNavMenu(){
    secondaryMenu.classList.remove("show")
    htmlAllowScroll();
}

function htmlNoScroll(){
    documentHTML.classList.add("noScroll")
}

function htmlAllowScroll(){
    documentHTML.classList.remove("noScroll")
}

window.addEventListener("scroll", function(){
    checkVerticalScroll();
})

function checkVerticalScroll(){
    let distance = document.querySelector(".topHeader").offsetHeight;
    let header = document.querySelector("#mainHeader")
    if (window.scrollY >= distance ){
        header.classList.add("fixed")
        document.body.classList.add('fixedNav')
    } else {
        header.classList.remove('fixed')
        document.body.classList.remove('fixedNav')
    }
}

checkVerticalScroll();