import icons from '../../img/icons.svg';
import View from './View.js';

class bookmarksView extends View {
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage = 'No bookmarks selected !';
    message;

    getMarkup() {    
        return this.data.map(function (bookmark) {
            return `
            <li class="preview">
                <a class="preview__link" href="#${bookmark.id}">
                    <figure class="preview__fig">
                        <img src="${bookmark.image}" alt="${bookmark.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${bookmark.title}</h4>
                        <p class="preview__publisher">${bookmark.publisher}</p>
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

    addHandlerBookmark(handler) {
        window.addEventListener('load', handler)
    }

}

export default new bookmarksView();