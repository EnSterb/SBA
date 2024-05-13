const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const submitButton = document.querySelector("#sign-in-button");
const email = document.getElementById("email");
const password = document.getElementById("password");

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}

submitButton.addEventListener("click", async () => {

 if (!isEmailValid(email.value) && password.value.length < 8) {
     document.getElementById("error").textContent = "Неверный адресс или пароль";
     submitButton.style.border = "2px solid red"
 }else{

     const formData = new FormData();
    formData.append('username', document.getElementById("email").value);
    formData.append('password', document.getElementById("password").value);

const urlEncodedData = new URLSearchParams(formData).toString();

fetch('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: urlEncodedData,
})
.then(response => {
    if (response.ok) {
        window.location.href = "index";
    }
    else {
        document.getElementById("error").textContent = "Неверный адресс или пароль";
             submitButton.style.border = "2px solid red"
    }

})
.catch(error => {

    });
 }

});
