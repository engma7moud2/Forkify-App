import icons from '../../img/icons.svg';
import View from './View.js';

class addRecipeView extends View {
    message = 'Recipe Successfully Added !'
    parentElement = document.querySelector('.upload');
    window = document.querySelector('.add-recipe-window');
    overlay = document.querySelector('.overlay');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this.addHandlerOpen();
        this.addHandlerClose();
    }

    toggleModal() {
        this.window.classList.toggle('hidden');
        this.overlay.classList.toggle('hidden');
    }
    addHandlerOpen() {
        this.btnOpen.addEventListener('click', this.toggleModal.bind(this));
    }
    addHandlerClose() {
        this.btnClose.addEventListener('click', this.toggleModal.bind(this));
        this.overlay.addEventListener('click', this.toggleModal.bind(this));
    }

    addHandlerUpload(handler) {
        this.parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr); // convert array to object
            handler(data);
        })
    }

}

export default new addRecipeView();