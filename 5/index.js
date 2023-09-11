let element = document.querySelector('.element');
let hiddenElements = document.querySelectorAll('.hidden');

function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}

function toggleHiddenElements() {
    hiddenElements.forEach(function(hiddenElement) {
        hiddenElement.classList.toggle('hidden');
    });
}

element.addEventListener('click', debounce(toggleHiddenElements, 1000));
