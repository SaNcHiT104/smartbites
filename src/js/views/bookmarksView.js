//file to show bookmarks
//view have all function that are called again and again
//ensure all elements have same name
//importing icons
import icons from 'url:../../img/icons.svg';
import View from './View.js';
class BookMarks extends View {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = 'No bookmarks yet!Find a recipe and Bookmark it :)';
  message = '';
  generateMarkup() {
    return this.data.map(this.generateMarkupPreview).join('');
  }
  generateMarkupPreview(result) {
    //using result object which is with title,id,image and publisher

    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        } " href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
        </div>
        </a>
    </li>
    `;
  }
}

export default new BookMarks();
