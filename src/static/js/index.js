
function checkIndexCookie() {
  return document.cookie.indexOf("bank") !== -1;
}

function goWorkOrLogIn() {

    if (checkIndexCookie()){
        window.location.href = "work";
    } else{
        window.location.href = "login";
    }
}

document.getElementById("index-link").addEventListener("click", goWorkOrLogIn);
