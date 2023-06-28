//model js is implemented to interact with api and return it to controller
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {}, //recipe object;
  search: {
    query: '', //stores the query
    results: [],
    resultsPerPage: RES_PER_PAGE, //getting from config
    page: 1,
  },
};
//fetching data from api
//load recipe changes the state recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data; //new object to  get rid of underscores
    // console.log(recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
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
