const animations = ['pulse-animation', 'move-animation', 'rotate-animation']
let shapes = document.querySelectorAll('.shape, .triangle, .square, .rectangle');
shapes.forEach(function (shape) {
    shape.addEventListener('click', function () {
        shape.classList.toggle(animations[randomIntFromInterval(0, 2)])
    });
});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
