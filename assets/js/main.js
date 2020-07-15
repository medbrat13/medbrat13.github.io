/*
    КЛАССЫ
*/
const openNavClass = 'nav--opened';
const fixedClass = 'fixed';
const yScrollable = 'y-scrollable';
const progressBarOneAnimation = 'first-line-animation';
const progressBarTwoAnimation = 'second-line-animation';
const progressBarThreeAnimation = 'third-line-animation';
const progressBarFourAnimation = 'fourth-line-animation';
const progressBarFiveAnimation = 'fifth-line-animation';


/*
    ОБЩЕЕ
 */
const html = document.getElementById('html');
const body = document.getElementById('body');
const nav = document.getElementById('main-nav__nav');
const navToggle = document.getElementById('main-nav__toggler');
const header = document.getElementById('header');
const firstScreen = document.getElementById('first-screen');

// Открытие и закрытие мобильного меню
navToggle.addEventListener('click', () => {
    html.classList.toggle(fixedClass);
    body.classList.toggle(fixedClass);
    firstScreen.classList.toggle(yScrollable);
    header.classList.toggle(yScrollable);
    nav.classList.toggle(yScrollable);
    nav.classList.toggle(openNavClass);
});


/*
    ГЛАВНАЯ
*/
if (location.pathname === '/') {
    const progressBarsBlock = document.getElementById('promo-animate');
    const progressBarOne = document.getElementById('first-line');
    const progressBarTwo = document.getElementById('second-line');
    const progressBarThree = document.getElementById('third-line');
    const progressBarFour = document.getElementById('fourth-line');
    const progressBarFive = document.getElementById('fifth-line');

    // Анимация полос загрузки
    const progressBarsBlockBottomOffset = progressBarsBlock.offsetTop;
    const progressBarsBlockWidth = progressBarsBlock.clientWidth;

    const doProgressBarsAnimation = () => {
        progressBarOne.classList.add(progressBarOneAnimation);
        progressBarTwo.classList.add(progressBarTwoAnimation);
        progressBarThree.classList.add(progressBarThreeAnimation);
        progressBarFour.classList.add(progressBarFourAnimation);
        progressBarFive.classList.add(progressBarFiveAnimation);
    }

    const recountPercentage = () => {
        setInterval(() => countCurrentPercentage(progressBarOne), 50);
        setInterval(() => countCurrentPercentage(progressBarTwo), 50);
        setInterval(() => countCurrentPercentage(progressBarThree), 50);
        setInterval(() => countCurrentPercentage(progressBarFour), 50);
        setInterval(() => countCurrentPercentage(progressBarFive), 50);
    }

    const countCurrentPercentage = el => {
        el.children[0].textContent = (el.clientWidth / (progressBarsBlockWidth / 100)).toFixed() + '%';
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY >= progressBarsBlockBottomOffset) recountPercentage();
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY >= progressBarsBlockBottomOffset) doProgressBarsAnimation();
    });


    // Обработка формы обратной связи
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackButton = document.getElementById('feedback-button');
    const successPopup = document.getElementById('success-popup');

    // Данные ниже отправляются php в <head> перед загрузкой этого js-скрипта
    const wpRequestHandler = feedback_object.url; // url обработчика формы - admin-ajax.php
    const wpNonce = feedback_object.nonce;        // вордпрессовский nonce
    const wpAction = feedback_object.action       // имя action, определенное на бекенде

    const usernameInput = feedbackForm.childNodes[1].childNodes[0];
    const emailInput    = feedbackForm.childNodes[3].childNodes[0];
    const messageInput  = feedbackForm.childNodes[5].childNodes[0];

    const clearFormFields = () => {
        usernameInput.value = '';
        emailInput.value    = '';
        messageInput.value  = '';
    }

    const errCssClasses = {
        inputNotFilled: 'no-text',
        emailNotMatched: 'not-matched',
        textareaOversized: 'oversized',
    }

    const handleInputErrors = () => {
        if (usernameInput.value === '') {
            usernameInput.parentElement.classList.add(errCssClasses.inputNotFilled);
            return false;
        }

        if (emailInput.value === '') {
            emailInput.parentElement.classList.add(errCssClasses.inputNotFilled);
            return false;
        }

        if (!emailInput.value.match(/.+?@.+/g)) {
            emailInput.parentElement.classList.add(errCssClasses.emailNotMatched);
            return false;
        }

        if (messageInput.value === '') {
            messageInput.parentElement.classList.add(errCssClasses.inputNotFilled);
            return false;
        }

        if (messageInput.value.length > 5000) {
            messageInput.parentElement.classList.add(errCssClasses.textareaOversized);
            return false;
        }

        return true;
    }

    const clearErrorMessages = () => {
        usernameInput.parentElement.classList.remove(errCssClasses.inputNotFilled);
        emailInput.parentElement.classList.remove(errCssClasses.inputNotFilled,errCssClasses.emailNotMatched);
        messageInput.parentElement.classList.remove(errCssClasses.inputNotFilled, errCssClasses.textareaOversized);
    }

    const isNoError = () => {
        return handleInputErrors();
    }

    const sendRequest = () => {
        const request = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('username', usernameInput.value);
        formData.append('email', emailInput.value);
        formData.append('message', messageInput.value);
        formData.append('nonce', wpNonce);
        formData.append('action', wpAction);

        request.open('POST', wpRequestHandler, true);
        request.addEventListener('readystatechange', () => {
            if ((request.readyState === 4) && (request.status === 200)) {
                clearFormFields();
                const jsonResponse = JSON.parse(request.responseText);
                successPopup.textContent = jsonResponse.data;
            } else {
                successPopup.textContent = 'Произошла неизведанная ошибка, сорян.';
            }

            successPopup.classList.add('visible');
            setTimeout(() => {
                successPopup.classList.remove('visible');
            }, 5000)
        });

        request.send(formData);
    }

    feedbackButton.addEventListener('click', (e) => {
        e.preventDefault()
        clearErrorMessages();

        if (isNoError()) {
            sendRequest();
            clearErrorMessages();
        }
    });
}



