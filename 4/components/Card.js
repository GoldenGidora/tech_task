export default class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._email = data.email;
        this._firstName = data.first_name;
        this._lastName = data.last_name;
        this._avatar = data.avatar;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._imageAvatar = this._element.querySelector('.cards__avatar');
        this._emailField = this._element.querySelector('.cards__email');
        this._fName = this._element.querySelector('.cards__firstname');
        this._lName = this._element.querySelector('.cards__lastname');

        this._imageAvatar.src = this._avatar;
        this._emailField.textContent = this._email;
        this._fName.textContent = this._firstName;
        this._lName.textContent = this._lastName;

        return this._element;
    }
}
