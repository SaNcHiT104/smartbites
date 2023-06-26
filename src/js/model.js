//model js is implemented to interact with api and return it to controller
import { async } from 'regenerator-runtime';
export const state = {
  recipe: {}, //recipe object;
};
//fetching data from api
//load recipe changes the state recipe
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json(); //coverting body to json
    if (!res.ok) throw new Error(`${data.message} , ${res.success}`);

    const { recipe } = data.data; //new object to  get rid of underscores
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
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
