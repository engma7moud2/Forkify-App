import icons from '../../img/icons.svg';

export default class View {
    data;

    clear() {
        this.parentElement.innerHTML = '';  
    }

    loadSpinner () {
        const markup = `        
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
            `
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        this.data = data; // updating the data when calling the function
        if (!data || data.length === 0) return this.renderError();

        this.clear();
        const markup = this.getMarkup();
        this.parentElement.insertAdjacentHTML("afterbegin", markup);         
    }

    renderError(message=this.errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div> 
        `
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message=this.message) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div> 
        `
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}