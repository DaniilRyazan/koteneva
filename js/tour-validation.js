// tour-validation.js
// Функции для валидации формы заказа и работы с модальными окнами

document.addEventListener('DOMContentLoaded', function() {

    initializeHints();

    const images = document.querySelectorAll('.tour-images .image-sec img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    const confirmationModal = document.getElementById('orderConfirmation');
    if (confirmationModal) {
        confirmationModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeConfirmation();
            }
        });
    }

    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeOrderModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeOrderModal();
            closeConfirmation();
        }
    });

    setupValidationListeners();

    console.log('Tour validation script loaded successfully');
});

function initializeHints() {

    const hints = {
        'user-name': 'Только русские буквы. От 2 до 50 символов',
        'user-phone': 'Формат: +7 (999) 999-99-99',
        'email': 'Формат: example@mail.ru',
        'country': 'Выберите страну отправления',
        'city': 'Выберите город отправления'
    };

    Object.keys(hints).forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            let hintElement = input.parentNode.querySelector('.input-hint');

            if (!hintElement) {
                hintElement = document.createElement('small');
                hintElement.className = 'input-hint';
                input.parentNode.appendChild(hintElement);
            }

            hintElement.textContent = hints[id];

        }

    });

}

function setupValidationListeners() {

    const nameInput = document.getElementById('user-name');
    if (nameInput) {

        nameInput.addEventListener('input', function() {
            validateNameWithDelay(this);
        });

        nameInput.addEventListener('blur', function() {
            validateName(this);
        });

    }

    const phoneInput = document.getElementById('user-phone');
    if (phoneInput) {

        phoneInput.addEventListener('input', function() {
            formatPhoneWithDelay(this);
        });

        phoneInput.addEventListener('blur', function() {
            formatPhone(this);
        });

    }

    const emailInput = document.getElementById('email');
    if (emailInput) {

        emailInput.addEventListener('input', function() {
            validateEmailWithDelay(this);
        });

        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });

    }

}

function openModal(imgSrc) {

    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal').style.display = 'flex';

}

function closeModal() {

    document.getElementById('modal').style.display = 'none';

}

let nameTimeout;

function validateNameWithDelay(input) {

    clearTimeout(nameTimeout);

    nameTimeout = setTimeout(() => {
        validateName(input);
    }, 300);

}

function validateName(input) {

    const name = input.value.trim();
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

    let isValid = true;
    let message = '';

    if (name.length < 2) {
        isValid = false;
        message = 'Минимум 2 символа';
    }

    if (!nameRegex.test(name)) {
        isValid = false;
        message = 'Только буквы';
    }

    updateInputVisualState(input, isValid, message);

    return isValid;

}

let phoneTimeout;

function formatPhoneWithDelay(input) {

    clearTimeout(phoneTimeout);

    phoneTimeout = setTimeout(() => {
        formatPhone(input);
    }, 300);

}

function formatPhone(input) {

    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('7') || value.startsWith('8')) {
        value = value.substring(1);
    }

    let formattedValue = '+7 (';

    if (value.length > 0) formattedValue += value.substring(0, 3);
    if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
    if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
    if (value.length > 8) formattedValue += '-' + value.substring(8, 10);

    input.value = formattedValue;

    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

    const isValid = phoneRegex.test(input.value);

    updateInputVisualState(input, isValid, '');

    return isValid;

}

let emailTimeout;

function validateEmailWithDelay(input) {

    clearTimeout(emailTimeout);

    emailTimeout = setTimeout(() => {
        validateEmail(input);
    }, 300);

}

async function validateEmail(input) {

    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;
    let message = '';

    if (!emailRegex.test(email)) {

        isValid = false;
        message = 'Некорректный email';

    }

    if (isValid) {

        try {

            const response = await fetch(`http://localhost:5058/api/validate/email?email=${email}`);

            const data = await response.json();

            if (!data.valid) {

                isValid = false;
                message = 'Email уже используется';

            }

        } catch {

            console.log("Ошибка AJAX проверки email");

        }

    }

    updateInputVisualState(input, isValid, message);

    return isValid;

}

function updateInputVisualState(input, isValid, message='') {

    input.classList.remove('valid','invalid');

    if (isValid) {

        input.classList.add('valid');

    } else {

        input.classList.add('invalid');

    }

    const hintElement = input.parentNode.querySelector('.input-hint');

    if (hintElement && message) {

        hintElement.textContent = message;
        hintElement.classList.add('error');

    }

}

function closeOrderModal(){

    document.getElementById('orderModal').style.display='none';

}

function closeConfirmation(){

    document.getElementById('orderConfirmation').style.display='none';

}