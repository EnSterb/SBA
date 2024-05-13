const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const submitButton = document.querySelector("#sign-in-button");

const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");


function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}

function showError(element, message) {
    // Показать сообщение об ошибке
    element.innerText = message;
    // Сделать видимой область с сообщением об ошибке
    element.style.display = "block";
}

// Функция для скрытия ошибок
function hideError(element) {
    // Скрыть сообщение об ошибке
    element.innerText = "";
    // Скрыть область с сообщением об ошибке
    element.style.display = "none";
}

// Обработчик события для поля email
email.addEventListener("input", function() {
    if (!isEmailValid(email.value)) {
        showError(emailError, "Введите корректный email");
    } else {
        hideError(emailError);
    }
});

// Обработчик события для поля пароля
password.addEventListener("input", function() {
    if (password.value.length < 8) {
        showError(passwordError, "Пароль должен содержать не менее 8 символов");
    } else {
        hideError(passwordError);
    }
});

// Обработчик события для поля подтверждения пароля
confirmPassword.addEventListener("input", function() {
    if (password.value !== confirmPassword.value) {
        showError(confirmPasswordError, "Пароли не совпадают");
    } else {
        hideError(confirmPasswordError);
    }
});

submitButton.addEventListener("click", async () => {
    // Проверка валидности email
    if (!isEmailValid(email.value)) {
        showError(emailError, "Введите корректный email");
        return; // Прерываем выполнение функции, если email невалидный
    }

    // Проверка валидности пароля
    if (password.value.length < 8) {
        showError(passwordError, "Пароль должен содержать не менее 8 символов");
        return; // Прерываем выполнение функции, если пароль невалидный
    }

    // Проверка совпадения паролей
    if (password.value !== confirmPassword.value) {
        showError(confirmPasswordError, "Пароли не совпадают");
        return; // Прерываем выполнение функции, если пароли не совпадают
    }

    // Очистка ошибок, если поля валидные
    hideError(emailError);
    hideError(passwordError);
    hideError(confirmPasswordError);

    // Отправка данных на сервер
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value,
                "is_active": true,
                "is_superuser": false,
                "is_verified": false
            })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "index";
        } else {
            console.error("ERROR ENTER DATA:", data.message);
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
});