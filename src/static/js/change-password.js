// Обработчик события для поля пароля
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const submitButton = document.getElementById("sign-in-button");


function showError(element, message) {
    // Показать сообщение об ошибке
    element.innerText = message;
    // Сделать видимой область с сообщением об ошибке
    element.style.display = "block";
}
function hideError(element) {
    // Скрыть сообщение об ошибке
    element.innerText = "";
    // Скрыть область с сообщением об ошибке
    element.style.display = "none";
}

submitButton.addEventListener("click", async () => {
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
    hideError(passwordError);
    hideError(confirmPasswordError);

    // Получение email пользователя


    // Отправка данных на сервер для смены пароля
    try {
        const response = await fetch('/auth/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "",
                "password": password.value,
                "is_active": true,
                "is_superuser": false,
                "is_verified": false

            })
        });

        const data = await response.json();

        if (response.ok) {
            // Пароль успешно изменен, можно перенаправить пользователя куда-то
            window.location.href = "index";
        } else {
            console.error("ERROR ENTER DATA:", data.message);
            // Можно показать сообщение об ошибке, если нужно
        }
    } catch (error) {
        console.error("ERROR:", error);
        // Можно показать сообщение об ошибке, если нужно
    }
});