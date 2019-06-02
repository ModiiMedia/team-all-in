let pageBody = document.getElementById("mainContentWrapper")
let authModal = document.getElementById("authenticationWrapper");
let logoutButtons = document.querySelectorAll(".logoutButton")
let currentUser = {}
let loginForm = document.getElementById("login_form")
let loginFormUserId = document.getElementById("login_form_user_id")
let cookiePath = location.origin + "/";
let cookieDomain = location.origin;

loginForm.addEventListener("submit", function(){
    logUserIn(loginFormUserId.value);
})

let userCookie = "website_userid"

for(let i = 0; i < logoutButtons.length; i++){
    logoutButtons[i].addEventListener("click", function(){
        logUserOut();
    })
}

if (getCookie(userCookie)){
    let cookie = getCookie(userCookie)
    console.log(`Cookie found`)
    checkForUser(cookie);
} else {
    console.log("user is not logged in")
    console.log(getCookie(userCookie))
    showAuthModal();
}

function showAuthModal(id){
    let standardContent = document.getElementById("auth_standard_modal");
    let wrongIdContent = document.getElementById("auth_id_not_found_modal");

    standardContent.classList.remove("hide");
    wrongIdContent.classList.remove("hide");

    authModal.classList.add("show")
    pageBody.classList.add("hide")

    if(id){
        standardContent.classList.add("hide")
        document.getElementById("auth_user_id").innerHTML = id
    } else {
        wrongIdContent.classList.add("hide")
    }
}

function getCookie(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        return match[2];
      }
      else{
           return false;
      }
}

function checkForUser(userId){
    let req = new XMLHttpRequest();
    req.open ("GET", "/users/index.json");
    req.addEventListener("load", function(){
        let data = JSON.parse(this.responseText);
        let currentUser = data.users[userId]
        currentUser.customer_id = userId
        console.log(currentUser)
        if (currentUser){
            setCurrentUser(currentUser);
        } else {
            showAuthModal(userId)
        }
    })
    req.send();
}

function logUserOut(){
    let d = new Date('January 1, 2000 01:00:00');
    document.cookie = `${userCookie}= ; path = / ; expires = ${d.getUTCDate()}`
    location.reload();
}

function logUserIn(id){
    let nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    document.cookie = `${userCookie}=${id} ; path = / ; expires ${nextYear}`
    location.reload();
}

function setCurrentUser(userObj){
    currentUser = userObj
    console.log(`User Logged In\nName: ${currentUser.title}\nId: ${currentUser.customer_id}`)

    let infoEl = {
        name: document.querySelectorAll(".profileUserName"),
        // email: document.querySelectorAll(".profileUserEmail"),
        profileLink: document.querySelectorAll(".profileLink"),
        // photo: document.querySelectorAll(".profilePhoto")
    }

    for(let i = 0; i < infoEl.name.length; i++){
        infoEl.name[i].innerHTML = currentUser.title
    }
    // for(let i = 0; i < infoEl.email.length; i++){
    //     infoEl.email[i].innerHTML = currentUser.email
    // }
    for(let i = 0; i < infoEl.profileLink.length; i++){
        infoEl.profileLink[i].href = currentUser.url
    }
}

