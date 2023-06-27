//importing icons
import icons from 'url:../../img/icons.svg';
//common in all view
export default class View {
  data;
  render(data) {
    // if we find data then check the length of arr also
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data; //model is setting data in recipe object and that object is shared in this so basically recipe object is in data
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    //clears the field
    this.parentElement.innerHTML = '';
  }
  //for render error
  renderError(x = this.errorMessage) {
    console.log(this.errorMessage);
    const markup = `
        <div class="error">
         <div>
           <svg>
              <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${x}</p>
        </div>
        `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //render welcome message
  renderMessage(message = this.message) {
    const markup = `
        <div class="message">
         <div>
           <svg>
              <use href="${icons}#icon-smile"></use>
          </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //for render animation
  renderSpinner() {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
