export default class Slider {
    constructor(links, templateSelector) {
        this._links = links;
        this._templateSelector = templateSelector;
        this._slideIndex = 0;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
    }

    _prevClick() {
        this._slideIndex = (this._slideIndex - 1 + this._links.length) % this._links.length;
        this._slideImage.src = this._links[this._slideIndex];
    }

    _nextClick() {
        this._slideIndex = (this._slideIndex + 1) % this._links.length;
        this._slideImage.src = this._links[this._slideIndex];
    }

    _setEventListeners() {
        this._prevButton.addEventListener('click', this._prevClick.bind(this));
        this._nextButton.addEventListener('click', this._nextClick.bind(this));
    }

    generateSlider() {
        this._element = this._getTemplate();
        this._slideImage = this._element.querySelector('.slider__image');
        this._prevButton = this._element.querySelector('.slider__button-prev');
        this._nextButton = this._element.querySelector('.slider__button-next');
        this._slideImage.src = this._links[0];
        this._setEventListeners();

        return this._element
    }
}

