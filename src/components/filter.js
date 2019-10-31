import React from "react";

export function Filter(props) {
  const { handleOptionChange } = props;

  return (
    <div>
      Filter by:{" "}
      <select
        name="filter"
        id="filter"
        className="form-control mr-2"
        onChange={handleOptionChange}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}

export default Filter;
