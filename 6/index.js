document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Проверка условий валидации
    if (!/^[a-zA-Zа-яА-Я]{3,30}$/.test(name)) {
        alert('Ошибка: Имя должно содержать только кириллицу/латиницу и быть от 3 до 30 символов');
        return;
    }

    if (!/^(\+)?\d{10,15}$/.test(phone)) {
        alert('Ошибка: Неправильный формат телефона');
        return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(password)) {
        alert('Ошибка: Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру');
        return;
    }

    if (password !== confirmPassword) {
        alert('Ошибка: Пароли не совпадают');
        return;
    }

    // Если все условия выполнены, можно отправить форму
    alert('Данные успешно отправлены!');
});
