import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js' // importing everything that exported from file model as model object
import viewRecipe from './views/viewRecipe.js'; // importing the new object from viewRecipe file as viewRecipe
import getSearchResult from './views/getSearchResult.js';
import renderSearchResults from './views/renderSearchResults.js'; 
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    
    //1. get the id for recipe
    const id = window.location.hash.slice(1);
    // const id = "5ed6604591c37cdc054bc886"
    if (!id) return;

    viewRecipe.loadSpinner(); // calling loadSpinner method from viewRecipe object that imported from viewRecipe file

    //2. get the recipe data
    await model.getRecipe(id); // calling getRecipe async function from model file that return promise 
                               //(should use await on that promise to not block the rest of the code)
   //3. render the recipe
    viewRecipe.render(model.state.recipe); // calling render method from viewRecipe object and pass data from model.state file as parameter

  } catch (err) {
    viewRecipe.renderError();
  }
  
}


const showSearchResult = async function () {

  try {
    renderSearchResults.loadSpinner();

    //1. get search query
    const query = getSearchResult.getSearchQuery();
    if (!query) return;
    //2. get search result
    await model.searchRecipe(query);
    //3. render the results
    // Note that calling the render method in any of view files will update the data in View class
    // renderSearchResults.render(model.state.searchResults.result); // will render all search results
    renderSearchResults.render(model.getSearchResultPage());
    //4. render the pagination
    paginationView.render(model.state.searchResults);
  }
  catch (err) {
    renderSearchResults.renderError();
  }

}

const showSearchResultsPatch = function (PageNo) {
  // Render new patch of pages
  renderSearchResults.render(model.getSearchResultPage(PageNo));
  // Render new pagination buttons
  paginationView.render(model.state.searchResults);

}

const updateServing = function (newServing) {
  model.updateServing(newServing);
  viewRecipe.render(model.state.recipe);
}

const updateBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  viewRecipe.render(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

const renderBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const addRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.loadSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    viewRecipe.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window after some time in order to show the message
    setTimeout(function () {
      addRecipeView.toggleModal();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('⚠', err);
    addRecipeView.renderError(err.message);
  }
}

// subscriber functions to the publisher method addHandlerRender() by passing application logic functions to it
const init = function () {
  viewRecipe.addHandlerRender(showRecipe);
  viewRecipe.addHandlerServings(updateServing);
  viewRecipe.addHandlerBookmark(updateBookmark);
  getSearchResult.addHandlerSearch(showSearchResult);
  paginationView.addHandlerClick(showSearchResultsPatch);
  bookmarksView.addHandlerBookmark(renderBookmarks);
  addRecipeView.addHandlerUpload(addRecipe);
}

init();