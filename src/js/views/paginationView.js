import icons from '../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
    parentElement = document.querySelector('.pagination');

    getMarkup() {
        const NumOfPages = Math.ceil(this.data.result.length / this.data.resultsPerPage);
        const currentPage = this.data.resultsPageNum;
        console.log(NumOfPages);

        // if 1 page & there are other pages
        if (currentPage === 1 && NumOfPages > 1) {
            return `
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        // if only 1 page
        if (currentPage === 1 && NumOfPages === 1) {
            return ``
        }
        // if there are multiple pages
        if (NumOfPages > 1 && currentPage > 1 && currentPage < NumOfPages) {
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        // if last page
        if (currentPage === NumOfPages) {
            return `
        <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `
        }

    }

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function (e) {
            const btnClicked = e.target.closest('.btn--inline');
            if (!btnClicked) return;
            const gotoPage = +btnClicked.dataset.goto;
            handler(gotoPage);
        });
    }
}

export default new paginationView();