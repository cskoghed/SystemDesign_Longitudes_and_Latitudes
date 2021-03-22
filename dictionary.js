var language = "en";            //The currently chosen language

// Here we store all the strings for each language
var dict = {
    'en' : {
        'sign-in' : "Sign in",
        'guest' : "Guest",
        'username' : "Username",
        'password' : "Password",
        'menu' : "Menu",
        'undo' : "Undo",
        'redo' : "Redo",
        'language' : "Switch language",
        'pay' : 'Pay', 
        'logout' : 'Log Out',
        'login' : 'Login', 
        'callGuardsBtn' : 'Call for guards', 
        'callGuardsMessage' : "Guards are on their way."
    },

    'sv' : {
        'sign-in' : "Logga in",
        'guest' : "Gäst",
        'username' : "Användarnamn",
        'password' : "Lösenord",
        'menu' : "Meny",
        'undo' : "Ångra",
        'redo' : "Gör om",
        'language' : "Byt språk",
        'pay' : "Betala", 
        'logout' : "Logga ut",
        'login' : 'Logga in', 
        'callGuardsBtn' : 'Kalla på vakter', 
        'callGuardsMessage' : "Vakter är på väg."
    }
}

// Sets the language to what's been saved in window.sessionStorage
function loadLanguage(){
    var storedLanguage = window.sessionStorage.getItem("language")
    if (!(typeof storedLanguage === 'undefined' || storedLanguage === null)){
        language = storedLanguage;
    }
    window.sessionStorage.setItem("language", language);
}

function getStringFromDict(key){
    // console.log(dict[language][key]);
    return dict[language][key];
}

// Change language and save it to window.sessionStorage
function changeLang(){
    if (language == 'sv'){
        language = 'en';
    } 
    else{
        language = 'sv';
    } 
    window.sessionStorage.setItem("language", language)
    applyLanguage();
}

// Apply the current language
function applyLanguage(){
    $("#loginBtn").val(getStringFromDict('sign-in'));
    $("#customerBtn").val(getStringFromDict('guest'));
    $("#usernameInput").attr("placeholder", getStringFromDict('username'));
    $("#passwordInput").attr("placeholder", getStringFromDict('password'));
    $("#menuBtn").text(getStringFromDict('menu'));
    $("#undoBtn").text(getStringFromDict('undo'));
    $("#redoBtn").text(getStringFromDict('redo'));
    $("#langBtn").text(getStringFromDict('language'));
    $("#payBtn").text(getStringFromDict('pay'));
    $("#logOutBtn").text(getStringFromDict('logout'));
    $("#loginText").text(getStringFromDict('login'));
    $("#callGuardsBtn").text(getStringFromDict('callGuardsBtn'));
}

loadLanguage();
applyLanguage();