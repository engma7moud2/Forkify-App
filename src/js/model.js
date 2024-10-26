import { GET_JSON, SEND_JSON } from "./helpers.js";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";

export const state = {
    recipe: {
        
    },
    searchResults: {
        query: '',
        result: [],
        resultsPageNum: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks:[],
}

const createRecipeObject = function (data) {
    const recipe  = data.data.recipe;
    return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    };
};

export const getRecipe = async function (id) {
    try {
        const data = await GET_JSON(`${API_URL}${id}`);
        
        const recipe = data.data.recipe;
        
        state.recipe = createRecipeObject(data);

        // check if the recipe in the bookmarks array and update property bookmarked to any of fetched recipes
        if (state.bookmarks.some(bookmark => bookmark.id === recipe.id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }
    
    } catch (err){
        throw err;
    }
}

export const searchRecipe = async function (query) {

    state.searchResults.query = query;

    const data = await GET_JSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.searchResults.result = data.data.recipes.map(function (rec) {
        return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
        }
    });

    state.searchResults.resultsPageNum = 1;
}

export const getSearchResultPage = function (pageNum = state.searchResults.resultsPageNum) {
    // updating the state resultsPageNum by the parameter value passed when calling the function
    state.searchResults.resultsPageNum = pageNum;
    
    //returning part /patch of the search array objects (10 results)
    const start = (pageNum - 1) * state.searchResults.resultsPerPage;
    const end = pageNum * state.searchResults.resultsPerPage;

    return state.searchResults.result.slice(start, end);
}

export const updateServing = function (newServing) {
    // update ingredients
    state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServing / state.recipe.servings;
});
    // update servings
    state.recipe.servings = newServing;
}

const storeBookmarks = function () {
    localStorage.setItem('Bookmarks', JSON.stringify(state.bookmarks));
}

const loadBookmarks = function () {
    const storage = localStorage.getItem('Bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}

export const addBookmark = function (recipe) {
    // update bookmarks array
    state.bookmarks.push(recipe);
    // add new property bookmarked to the recipe
    if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
    // add to local storage
    storeBookmarks();
}

export const deleteBookmark = function (id) {
    // update bookmarks array
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);
    // update property bookmarked to false
    if (state.recipe.id === id) state.recipe.bookmarked = false;
    storeBookmarks();
}

loadBookmarks(); // updating the bookmarks array when loading from the local storage


export const uploadRecipe = async function (newRecipe) {
    try {
    // creating ingredients array of objects
    const ingredients = Object.entries(newRecipe) // convert object to array
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
        throw new Error('Wrong ingredient format! Please use the correct format :)');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
    });

    const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
    };

    const data = await SEND_JSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
} catch (err) {
    throw err;
}
};