//bookmarks and search results have same content so in one file
//file to show full menu of pizza
//view have all function that are called again and again
//ensure all elements have same name
//importing icons
import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PreviewView extends View {
  parentElement = '';

  generateMarkup() {
    //using result object which is with title,id,image and publisher
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          this.result.id === id ? 'preview__link--active' : ''
        } " href="#${this.result.id}">
        <figure class="preview__fig">
            <img src="${this.result.image}" alt="${this.result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this.result.title}</h4>
            <p class="preview__publisher">${this.result.publisher}</p>
        </div>
        </a>
    </li>
    `;
  }
}

export default new PreviewView();
