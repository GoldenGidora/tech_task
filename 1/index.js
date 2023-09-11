import './index.css';
import Slider from "./components/Slider";

const sliderSection = document.querySelector('.slider');

const links = [
    'https://i.imgur.com/QCbhtNr.png',
    'https://i.pinimg.com/564x/58/a9/d5/58a9d5cb66e98bf1b07aefb5418d1715.jpg',
    'https://i.pinimg.com/564x/c7/15/f5/c715f51969ea3e1f32bbb4e8cf295a1d.jpg',
    'https://i.pinimg.com/564x/00/86/72/00867200bdd1544955c7ecd2deaac21d.jpg',
    'https://i.pinimg.com/564x/6f/1d/7d/6f1d7d6111f8aae38d76b0a2f5c3e19f.jpg',
];


sliderSection.prepend(new Slider(links, '#slider_template').generateSlider());
