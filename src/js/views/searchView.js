class SearchView {
  #parentEl = document.querySelector('.search');
  getQuery() {
    const data = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return data;
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      //submit used if button is clicked or enter is pressed
      e.preventDefault();
      handler();
    });
  }
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}
export default new SearchView();
