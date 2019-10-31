import React from "react";

function Pagination(props) {
  const { restaurants, handlePageChange, currentPage, limitPerPage } = props;
  const pageButtons = [];

  if (!restaurants.length) return null;

  for (
    let pageNumber = 1;
    pageNumber <= Math.ceil(restaurants.length / limitPerPage);
    pageNumber += 1
  ) {
    pageButtons.push(
      <button
        id={`p` + pageNumber.toString()}
        className={
          `` +
          (currentPage === pageNumber
            ? "btn circle m-auto pg-button active"
            : "btn circle")
        }
        key={pageNumber}
        type="button"
        onClick={e => handlePageChange(pageNumber, e)}
      >
        {pageNumber}
      </button>
    );
  }

  const lower = currentPage > 3 ? currentPage - 2 : 1;
  const upper = currentPage > 3 ? currentPage + 2 : currentPage;

  let buttonsToRender = pageButtons.slice(lower, upper);

  if (buttonsToRender.length < 3) {
    buttonsToRender = pageButtons.slice(0, 4);
  }

  return (
    <div className="d-flex justify-content-left mt-4 mb-4 ml-4">
      <div id="paginationButtons">
        <button
          id="paginationPrevious"
          className={"btn btn-light disabled"}
          type="button"
          onClick={e => handlePageChange(currentPage - 1, e)}
        >
          <i className="fa fa-angle-left"> Back</i>
        </button>

        {buttonsToRender.slice(0, 4)}
        {buttonsToRender.slice(0, 4)[buttonsToRender.length - 1].props.id >
        pageButtons.length - 1 ? (
          ""
        ) : (
          <span>...{pageButtons[pageButtons.length - 1]}</span>
        )}
        <button
          id="paginationNext"
          className={"btn btn-light disabled"}
          type="button"
          onClick={e => handlePageChange(currentPage + 1, e)}
        >
          Forward <i className="fa fa-angle-right" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
