//Index Controller

function gotoLogin() {
    // $('#content').load("login/login.html");
    window.location.href = "login/login.html";
};

function gotoGuest() {
    // $('#content').load("guest/guestView.html");
    window.location.href = "guest/guestView.html";
};

function gotoBartender(){
    window.location.href = "bartender/bartender.html"
}

$(window).ready(function() {
    // // sessionStorage.setItem('key', 'value');
    // // var userMode = sessionStorage.getItem("userMode");
    // if (typeof(window.sessionStorage.getItem("userMode")) !== 'undefined') {
    //     // window.sessionStorage.setItem("userMode") = "Guest";
    //     gotoLogin();
    // } else if (sessionStorage.getItem("userMode") == "Guest") {
    //     alert("guest bby");
    //     // gotoGuest();
    // }
    gotoLogin();
});