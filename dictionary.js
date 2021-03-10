var language = "en";

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
        'pay' : 'Pay'
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
        'pay' : "Betala"
    }
}

function loadLanguage(){
    var storedLanguage = window.sessionStorage.getItem("language")
    if (typeof storedLanguage === 'undefined' || storedLanguage === null){
        // language = "en";
    } else {
        language = storedLanguage;
    }
    window.sessionStorage.setItem("language", language);
}

function getStringFromDict(key){
    // console.log(dict[language][key]);
    return dict[language][key];
}

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
}

loadLanguage();
applyLanguage();