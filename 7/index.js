let minCount = 10;
let maxCount = 100;
let count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

for (let i = 0; i < count; i++) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')';

    let square = document.createElement('div');
    square.className = 'square';
    square.style.backgroundColor = color;

    document.body.appendChild(square);
}
