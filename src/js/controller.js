import * as model from './model.js'; //import everything from model
import recipeView from './views/recipeView.js';
import 'core-js/stable'; //for all the browser
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //removing # from the id
    if (!id) return;
    recipeView.renderSpinner(); //loading animation until we fetch the data

    //loading recipe
    await model.loadRecipe(id); //returning async function so need to await => filling recipe object in model
    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(err.message);
  }
};
//hashchange
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
