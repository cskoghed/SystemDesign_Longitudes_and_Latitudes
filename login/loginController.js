
// Login Page Javascript


// Functions
function login() {
    var username = document.getElementById("usernameInput").value.toLowerCase();
    var password = document.getElementById("passwordInput").value;

    if (bartenders[username] == password) {
        userMode = "Bartender";
    } else if (vips[username] == password) {
        userMode = "VIP";
    } else if (username in bartenders || username in vips){
        alert("Wrong password for user '" + username + "'");
    } else if (username.length < 1){
        alert("Enter username and password");
    } else {
        alert("The user " + "'" + username + "'" + " does not exist");
    }
}


function customer() {
    sessionStorage.setItem('userMode', 'Guest');
    window.location.href = "../guest/guestView.html";
    // $('#content').load("../guest/guestView.html");
}

// Main

var bartenders = {
    "bartender": "admin"
};

var vips = {
    "calle": "skoghed"
};

document.getElementById("loginBtn").onclick = function() {login()};
document.getElementById("customerBtn").onclick = function() {customer()};

$('#usernameInput , #passwordInput').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the 'enter' key code
     {
        login();
     }
  });

