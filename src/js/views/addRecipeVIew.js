import icons from 'url:../../img/icons.svg';
import View from './View.js';
class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  message = 'Recipe was Successfully uploaded :)';
  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super(); //child class
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }
  toggleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataObj = [...new FormData(this)]; //getting data from the form and will be sended to model for doing api call
      const data = Object.fromEntries(dataObj); // array to obj
      handler(data);
    });
  }
  generateMarkup() {}
}
export default new AddRecipeView();
