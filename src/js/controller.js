import * as model from './model.js'; //import everything from model
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable'; //for all the browser
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeVIew.js';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// if (module.hot) {
//   //faster the reload
//   module.hot.accept();
// }

//showing single recipe in recipe container the user has picked

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //getting hash and removing #
    if (!id) return;
    recipeView.renderSpinner(); //loading animation until we fetch the data
    //load recipe
    resultsView.update(model.getSearchResultsPage()); //highlight the menu page again if we use render
    bookmarksView.update(model.state.bookmarks); //hihglighting selected recipe in bookmark page
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
    //rendering spinner
    resultsView.renderSpinner();
    // console.log(resultsView);
    const query = searchView.getQuery(); //getting text from seach button
    if (!query) return;
    //waiting for model to get response from api
    await model.loadSearchResults(query);
    //rendering results of 10 items on menu
    resultsView.render(model.getSearchResultsPage());
    //rendering initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goTo) {
  //rendering new results
  resultsView.render(model.getSearchResultsPage(goTo));
  //rendering changing pagination buttons
  paginationView.render(model.state.search);
};

//to control serving
const controlServings = function (update) {
  //update the recipe sevings (in state)
  model.updateServings(update);
  // update the recupe views
  // recipeView.render(model.state.recipe); causing flickering of images agian and again
  recipeView.update(model.state.recipe);
};

//to add bookmark

const addBookMark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookMarks(model.state.recipe);
  } else {
    model.removeBookMark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //render in bookmark
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  //error loading bookmarks in starting, problem in update
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //render recipe
    recipeView.render(model.state.recipe);
    //render message
    addRecipeView.renderMessage();
    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form
    setTimeout(function () {
      addRecipeView.toggleWindow(); //we need to show success message
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  //publisher subscriber pattern
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(addBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
