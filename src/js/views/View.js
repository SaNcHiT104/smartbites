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

  update(data) {
    this.data = data; //model is setting data in recipe object and that object is shared in this so basically recipe object is in data
    const newMarkup = this.generateMarkup(); //will only change the updates not updating full markup again
    const newDOM = document.createRange().createContextualFragment(newMarkup); //create virtual dom which will have the changed markup and form an object of it
    const newElements = Array.from(newDOM.querySelectorAll('*')); //converting Nodemap to array
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));
    // console.log(newElement);
    // console.log(curElement);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' //changes text directly
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value) //replacing attributes else we will have problem like getting only 3 and 5 for serving
        );
    });
  }
  clear() {
    //clears the field
    this.parentElement.innerHTML = '';
  }
  //for render error
  renderError(x = this.errorMessage) {
    // console.log(this.errorMessage);
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
