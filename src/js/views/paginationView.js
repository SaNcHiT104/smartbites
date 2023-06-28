import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      //handler not called directly because we need to decide which button is clicked
      e.preventDefault();
      const btn = e.target.closest('.btn--inline'); //closest find parent and if image is clicked then also it should work
      if (!btn) return;
      //   console.log(btn);
      const goToPage = +btn.dataset.goto; //string to number
      //   console.log(goToPage);
      handler(goToPage);
    });
  }
  generateMarkup() {
    const currPage = this.data.page;
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );
    // console.log(numPages);
    //page 1 and other pages
    if (currPage == 1 && numPages > 1) {
      return `
      <button data-goto="${
        currPage + 1
      }"class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    //last page
    if (currPage == numPages && numPages > 1) {
      return `
      <button data-goto="${
        //data-gotto added so that we can go to that page
        currPage - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
    </button>`;
    }
    //other page
    if (currPage < numPages) {
      return `
      <button data-goto="${
        currPage - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
            <span>Page ${currPage - 1}</span>
        </button>
        <button data-goto="${
          currPage + 1
        }"class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    //page 1 and no other pages
    return ``;
  }
}
export default new PaginationView();
