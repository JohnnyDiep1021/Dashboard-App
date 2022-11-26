import React from "react";

import "./Paginator.scss";

const Paginator = (props) => {
  // console.log(props.currentPage, props.lastPage);
  return (
    <div className="paginator">
      {props.children}
      <div className="paginator__controls">
        {props.currentPage > 1 && (
          <button className="paginator__control" onClick={props.onPrevious}>
            Previous
          </button>
        )}
        {props.currentPage < props.lastPage && (
          <button className="paginator__control" onClick={props.onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
