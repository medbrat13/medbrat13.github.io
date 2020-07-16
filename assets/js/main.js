/*
    КЛАССЫ
*/
const progressBarOneAnimation = 'first-line-animation';
const progressBarTwoAnimation = 'second-line-animation';
const progressBarThreeAnimation = 'third-line-animation';
const progressBarFourAnimation = 'fourth-line-animation';
const progressBarFiveAnimation = 'fifth-line-animation';

/*
    ЭЛЕМЕНТЫ
*/
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