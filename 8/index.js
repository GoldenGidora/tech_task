const fs = require('fs');
const path = require('path');
const os = require('node:os');

const filepath = path.join(__dirname, 'text.txt');

fs.readFile(filepath, {encoding: 'utf-8'}, (e, data) => {
    if (e) {
        console.log(e);
        return;
    }

    fs.writeFile(__dirname + '/reverseText.txt', data.split(' ').reverse().join(' '), (e) => {
        if (e) console.log(e);
    }) // Если тут нужно каждый раз создавать новый файл для, то можно просто генерировать новые названия вместо reverseText
})

console.log(`Тип операционной платформы: ${os.platform()}`);
console.log(`Домашняя директория: ${os.homedir()}`);
