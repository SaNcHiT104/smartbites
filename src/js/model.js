//model js is implemented to interact with api and return it to controller
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { getJSON, sendJSON } from './helper';

export const state = {
  recipe: {}, //recipe object;
  search: {
    query: '', //stores the query
    results: [],
    resultsPerPage: RES_PER_PAGE, //getting from config
    page: 1,
  },
  bookmarks: [],
};
//creating recipe object
const createRecipeObject = function (data) {
  const { recipe } = data.data; //new object to  get rid of underscores
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //if recipe key is their then we add key to our object
  };
};
//fetching data from api
//load recipe changes the state recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // console.log(recipe);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id == id)) {
      //iterating over bookamrks array and checking the id
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    // console.log(err);
    throw err; //getting error from helper and throwing it to controller
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search==${query}`);
    state.search.results = data.data.recipes.map(rec => {
      //mapping over the array by going to data -> data -> recipes
      return {
        //making object with all the variables for each array element
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1; //setting 1 after finding new recipe
  } catch {
    // console.log(err);
    throw err; //getting error from helper and throwing it to controller
  }
};
//pagination of all results
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0 for page 1
  const end = page * state.search.resultsPerPage; //10
  return state.search.results.slice(start, end); //0 to 9 loaded;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQt = oldQty*newServings/oldServings
  });
  state.recipe.servings = newServings;
};

//adding bookmarks
export const addBookMarks = function (recipe) {
  //add in bookmarks arr;
  if (state.bookmarks.length > 10) {
    state.bookmarks.splice(0, 1);
  }
  state.bookmarks.push(recipe);

  //mark current recipe as bookmarked
  if (state.recipe.id == recipe.id) state.recipe.bookmarked = true;
  persistBookmarks(); //localstorage setting
};

export const removeBookMark = function (id) {
  const index = state.bookmarks.findIndex(ele => ele.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe as removeBookmarked
  if (state.recipe.id == id) state.recipe.bookmarked = false;
  persistBookmarks(); //local storage setting
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
//gettting initial conditions back
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
//only for developing the site
const clearBookMarks = function () {
  localStorage.clear('bookmarks');
};

//request to upload new recipe
export const uploadRecipe = async function (newRecipe) {
  //changing the format of newRecipe just how we get the data setting newData same in that format
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] != '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        //checking arr has three parts or not
        if (ingArr.length != 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct Format'
          );
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
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe); //this will send us the data back also

    state.recipe = createRecipeObject(data);
    addBookMarks(state.recipe);
  } catch (err) {
    throw err;
  }
};
