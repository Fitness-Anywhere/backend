import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const SearchClassForm = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const reducer = useSelector((state) => state.clientReducer.allClasses);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = reducer.filter(
      (cla) =>
        cla.type.includes(value) ||
        cla.name.includes(value) ||
        cla.start_time.includes(value) ||
        cla.location.includes(value)
    );
    dispatch({ type: "ADDING_SEARCH_CLASSES", payload: filtered });
    history.push(`${url}/${value}/results`);
    setValue("");
  };
  return (
    <div className="SearchClassForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search for classes"
            value={value}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchClassForm;
