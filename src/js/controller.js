import * as model from './model.js'; //import everything from model
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';
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

// https://forkify-api.herokuapp.com/v2

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); //getting hash and removing #
    if (!id) return;
    recipeView.renderSpinner(); //loading animation until we fetch the data
    //load recipe
    await model.loadRecipe(id);
    //rendering recipie
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err.message);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
