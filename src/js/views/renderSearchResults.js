import icons from '../../img/icons.svg';
import View from './View.js';

class renderSearchResults extends View {
    parentElement = document.querySelector('.results');
    errorMessage = 'No Results Found for your search, Please try again !';
    message;

    getMarkup() {    
        return this.data.map(function (result) {
            return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                        <div class="preview__user-generated">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                        </div>
                    </div>
                </a>
            </li>
            `
        }).join('');
    }

}

export default new renderSearchResults();