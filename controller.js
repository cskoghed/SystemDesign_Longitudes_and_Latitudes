//Index Controller

function gotoLogin() {
    // $('#content').load("login/login.html");
    window.location.href = "login/login.html";
};

function gotoGuest() {
    // $('#content').load("guest/guestView.html");
    window.location.href = "guest/guestView.html";
};

$(window).ready(function() {
    // sessionStorage.setItem('key', 'value');
    // var userMode = sessionStorage.getItem("userMode");
    if (typeof(sessionStorage.getItem("userMode")) !== 'undefined') {
        gotoLogin();
    } else if (sessionStorage.getItem("userMode") == "Guest") {
        gotoGuest();
    }
});
 
//Login Controller
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("drinkmenu");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
};

// Login Page Controller


function customer() {
    sessionStorage.setItem('userMode', 'Guest');
    gotoGuest();
}

var bartenders = {
    "bartender": "admin"
};

var vips = {
    "calle": "skoghed"
};

// document.getElementById("loginBtn").onclick = function() {login()};
// document.getElementById("customerBtn").onclick = function() {customer()};

$('#usernameInput , #passwordInput').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the 'enter' key code
     {
        login();
     }
  });

