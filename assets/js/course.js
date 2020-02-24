let courseModules = document.querySelectorAll(".courseModule");
let cTitle = document.querySelector("#courseTitle");
let cBanner = document.querySelector("#courseBanner");
let cContent = document.querySelector("#courseContent");
let cModuleList = document.querySelector("#moduleList");
let cBackLink = document.querySelector("#courseBackLink");
let cBackLinkText = document.querySelector("#goBackText");
let moduleNav = document.querySelector("#moduleNavigation");
let nextButton = document.querySelector("#nextModule");
let previousButton = document.querySelector("#previousModule");
let moduleNavItems = document.querySelectorAll(".navItem.arrow");

window.onhashchange = function() {
	checkUrlParams();
	restoreDefault();
};

checkUrlParams();

function getModuleData(num) {
	let req = new XMLHttpRequest();
	req.open("GET", `${location.pathname}index.json`);
	req.addEventListener("load", function() {
		let data = JSON.parse(this.responseText);
		openModule(data, data.modules[num], num);
	});
	req.send();
}

// pass course object and module object into function
function openModule(course, module, moduleNum) {
	setModuleNavigation(moduleNum);
	scrollToTop();
	moduleNav.classList.add("show");
	// change banner image
	if (module.featured_image) {
		cBanner.style = `background-image: url(${cloudinary}w_1920,h_600,c_fill,q_90${module.featured_image})`;
	} else {
		cBanner.style = "";
	}

	// change title
	let mTitle;
	if (module.heading) {
		mTitle = module.heading;
	} else {
		mTitle = module.title;
	}
	cTitle.innerHTML = `${course.title}<br>
    <span class="titleText">${mTitle}</span>`;

	// change back link
	cBackLink.href = location.pathname;
	cBackLinkText.innerHTML = `${course.title}`;

	///// INSERTING MODULE CONTENT ////////
	// erase old content
	cContent.innerHTML = "";
	// hide module list
	cModuleList.classList.add("hide");
	// insert module sections
	let sections = module.sections;
	for (let i = 0; i < sections.length; i++) {
		let section = sections[i];
		switch (section.template) {
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
                </section>`;
				break;
		}
	}
}

function scrollToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// section template functions. They accept objects containing template information. Object JSON templates are created in "layouts/partials/course-modules/"
function insertTextSection(ob) {
	let html = `<section>${ob.content}</section>`;
	return html;
}

function insertVideoSection(ob) {
	console.log(ob);
	let html;
	if (ob.video.error) {
		html = `
		<section>
			<h2>${ob.section_heading}</h2>
			<div class="errorMessage">
				<div class="columns is-vcentered">
					<div class="column is-size-3 is-narrow">
						<i class="fas fa-exclamation-circle"></i>
					</div>
					<div class="column">
						<div>
							There was an error embedding the following URL:
						</div>
						<div>
							<strong>${ob.video.url}</strong>
						</div>
						<br>
						<div class="is-size-7">
							Please make sure you copied the <strong>video link</strong> not the download link or review link.
						</div>
					</div>
				</div>
			</div>
		</section>`;
	} else {
		const downloadButton = ob.video.download_url
			? `<a href="${ob.video.download_url ||
					""}" class="button is-small is-primary has-text-weight-normal">
					<span class="icon">
						<i class="fas fa-download"></i>
					</span>
					<span>
						Download Video
					</span>
				</a>`
			: "";
		html = `
		<section class="videoSection">
			<div class="columns">
				<div class="column">
					<h2>${ob.section_heading}</h2>
				</div>
				<div class="column is-narrow">
					${downloadButton}
				</div>
			</div>
				<div class="iframeContainer">
					${ob.video.embed_code}
				</div>
            </section>`;
	}
	return html;
}

function insertSectionHeading(ob) {
	let html = `
        <section>
            <h1 class="sectionHeading">${ob.content}</h1>
        </section>`;
	return html;
}

function insertDownloadableFile(ob) {
	let fileName = ob.file_name.substring(13);
	let html = `
        <section>
            <div class="columns is-variable is-5 fileColumns">
                <div class="column is-two-fifths">
                    <a href="${cloudinary}${ob.file}" target="_blank">
                        <div class="file-preview">`;
	if (ob.file.includes(".pdf")) {
		html += `           <i class="fas fa-file-pdf"></i>`;
	} else if (ob.file.includes(".jpg") || ob.file.includes(".png")) {
		html += `           <i class="fas fa-image"></i>`;
	} else {
		html += `           <i class="fas fa-file"></i>`;
	}

	html += `               <div class="file-preview-name">${fileName}</div>
                        </div>
                    </a>
                </div>
                <div class="column">
                    <h2>${ob.section_heading}</h2>`;
	if (ob.description != null) {
		html += `<p>${ob.description}</p>`;
	}
	html += `<a class="standardButton is-medium" target="_blank" href="${cloudinary}${ob.file}">${ob.button_text}</a>
                </div>
            </div>
        </section>`;
	return html;
}

function setModuleNavigation(num) {
	for (let i = 0; i < moduleNavItems.length; i++) {
		moduleNavItems[i].classList.remove("hide");
	}
	if (Number(num) === 0) {
		previousButton.classList.add("hide");
	} else if (Number(num) === courseModules.length - 1) {
		nextButton.classList.add("hide");
	}

	if (Number(num) > 0) {
		previousButton.href = `#item=${Number(num) - 1}`;
	} else {
		previousButton.href = ``;
	}
	if (Number(num) < courseModules.length) {
		nextButton.href = `#item=${Number(num) + 1}`;
	} else {
		nextButton.href = ``;
	}
}

function checkUrlParams() {
	let hash = window.location.hash;
	if (hash) {
		let num = Number(hash.replace("#item=", ""));
		getModuleData(num);
	}
}

function restoreDefault() {
	let hash = window.location.hash;
	if (!hash) {
		window.location = window.location.pathname;
	}
}
