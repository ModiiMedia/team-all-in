let courseModules = document.querySelectorAll(".courseModule")
let cTitle = document.querySelector("#courseTitle");
let cBanner = document.querySelector("#courseBanner");
let cContent = document.querySelector("#courseContent");
let cModuleList = document.querySelector("#moduleList");
let cBackLink = document.querySelector("#courseBackLink");
let cBackLinkText = document.querySelector("#goBackText")

for(let i = 0; i < courseModules.length; i++){
    let course = courseModules[i]
    let courseNum = Number(course.dataset.module)
    courseModules[i].addEventListener("click", function(){
        getModuleData(courseNum);
    })
}

function getModuleData(num){
    let req = new XMLHttpRequest();
    req.open("GET", `${location.pathname}index.json`);
    req.addEventListener("load", function(){
        let data = JSON.parse(this.responseText);
        openModule(data, data.modules[num])
    })
    req.send();
}

// pass course object and module object into function
function openModule(course, module){
    
    // change banner image
    if (module.featured_image){
        cBanner.style = `background-image: url(${cloudinary}w_1920,h_600,c_fill,q_90${module.featured_image})`
    } else {
        cBanner.style = ''
    }

    // change title
    let mTitle;
    if (module.heading) {
        mTitle = module.heading
    } else {
        mTitle = module.title
    }
    cTitle.innerHTML = `${course.title}<br>
    <span class="titleText">${mTitle}</span>`

    // change back link
    cBackLink.href = location.pathname
    cBackLinkText.innerHTML = `${course.title}`

    // change content
    cContent.innerHTML = ''
    cModuleList.classList.add("hide")
    let sections = module.sections
    for(let i = 0; i < sections.length; i++){
        let sec = sections[i]
        switch(sec.template){
            case "text-section":
                insertTextSection(sec);
                break;
            case "course-video":
                insertVideoSection(sec);
                break;
            case "downloadable-file":
            default:
                cContent.innerHTML += `Section Type Not Found`
        }
    }

}

// inserting module content

function insertTextSection(ob){
    cContent.innerHTML += `<section>${ob.content}</section>`
}

function insertVideoSection(ob){
    cContent.innerHTML += `
        <section>
            <h2>${ob.section_heading}</h2>
            <div class="iframeContainer">
                ${ob.video.embed_code}
            </div>
            </section>`
}
