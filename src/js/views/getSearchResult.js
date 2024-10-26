class getSearchResult {
    parentElement = document.querySelector('.search');

    getSearchQuery() {
        const query = this.parentElement.querySelector('.search__field').value;
        this.clear();
;        return query;
    }

    clear() {
        this.parentElement.querySelector('.search__field').value = '';
    }
    
    //add publisher method for handling the DOM events (presentation logic)
    addHandlerSearch(handler) {
        this.parentElement.addEventListener('submit',function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new getSearchResult();