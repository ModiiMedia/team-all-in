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
    scrollToTop();
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


    ///// INSERTING MODULE CONTENT ////////
    // erase old content
    cContent.innerHTML = ''
    // hide module list
    cModuleList.classList.add("hide")
    // insert module sections
    let sections = module.sections
    for(let i = 0; i < sections.length; i++){
        let section = sections[i]
        switch(section.template){
            // a new case must be added for each section template
            case "text-section":
                cContent.innerHTML += insertTextSection(section);
                break;
            case "course-video":
                cContent.innerHTML += insertVideoSection(section);
                break;
            case "downloadable-file":
                cContent.innerHTML += insertDownloadableFile(section);
                break;
            case "heading":
                cContent.innerHTML += insertSectionHeading(section);
                break;
            default:
                // error message when section template does not exit
                cContent.innerHTML += `
                <section class="error">
                    ERROR:<br>Section template for <strong><em> "${section.template}" </em></strong> does not exist. Please contact your webmaster.<br><br>
                    <div style="font-size: 0.8rem">New section JSON templates must be added to "layouts/partials/course-modules/" 
                    and then inserted with the openModule() function in "assets/js/course.js" (see note about inserting module content)</div>
                </section>`
                break;
        }
    }

}

function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// section template functions. They accept objects containing template information. Object JSON templates are created in "layouts/partials/course-modules/"
function insertTextSection(ob){
    let html = `<section>${ob.content}</section>`
    return html
}

function insertVideoSection(ob){
    let html = `
        <section>
            <h2>${ob.section_heading}</h2>
            <div class="iframeContainer">
                ${ob.video.embed_code}
            </div>
            </section>`
    return html
}

function insertSectionHeading(ob){
    let html = `
        <section>
            <h1 class="sectionHeading">${ob.content}</h1>
        </section>`
    return html;
}

function insertDownloadableFile(ob){
    let fileName = ob.file_name.substring(13)
    let html = `
        <section>
            <div class="columns is-variable is-5 fileColumns">
                <div class="column is-two-fifths">
                    <a href="${cloudinary}${ob.file}" target="_blank">
                        <div class="file-preview">`
    if(ob.file.includes(".pdf")){
        html += `           <i class="fas fa-file-pdf"></i>`
    }
    else if (ob.file.includes(".jpg") || ob.file.includes(".png")){
        html += `           <i class="fas fa-image"></i>`
    } 
    else {
        html += `           <i class="fas fa-file"></i>`
    }

    html += `               <div class="file-preview-name">${fileName}</div>
                        </div>
                    </a>
                </div>
                <div class="column">
                    <h2>${ob.section_heading}</h2>`
                    if (ob.description != null){
                html += `<p>${ob.description}</p>`
                    }
    html+=          `<a class="standardButton is-medium" target="_blank" href="${cloudinary}${ob.file}">${ob.button_text}</a>
                </div>
            </div>
        </section>`
    return html
}
