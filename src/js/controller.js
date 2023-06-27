import * as model from './model.js'; //import everything from model
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable'; //for all the browser
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
//showing single recipe in recipe container the user has picked
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //getting hash and removing #
    if (!id) return;
    recipeView.renderSpinner(); //loading animation until we fetch the data
    //load recipe
    await model.loadRecipe(id);
    //rendering recipie
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(); //getting error from model and throwing it to recipeView
  }
};
//getting all the objects from the search button for eg pizza so all the objects of pizza with different name
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery(); //getting text from seach button
    if (!query) return;
    //waiting for model to get response from api
    await model.loadSearchResults(query);
    //rendering results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  //publisher subscriber pattern
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
