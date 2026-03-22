import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // page 1 with other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1, 'next');
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1, 'prev');
    }

    // other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton(curPage - 1, 'prev') +
        this._generateMarkupButton(curPage + 1, 'next')
      );
    }

    // page 1 with no pages
    return '';
  }

  _generateMarkupButton(page, type) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
      ${
        type == 'prev'
          ? `<svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
          </button>`
          : `<span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
      }
    `;
  }
}

export default new PaginationView();
