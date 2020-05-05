import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const initialValues = {
  search: "",
};
const SearchClassForm = () => {
  const { register, reset, errors, handleSubmit } = useForm({ initialValues });
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.clientReducer.allClasses);

  const onSubmit = (value) => {
    const { search } = value;
    const filtered = reducer.filter(
      (cla) =>
        cla.type.includes(search) ||
        cla.name.includes(search) ||
        cla.start_time.includes(search) ||
        cla.location.includes(search)
    );
    dispatch({ type: "ADDING_SEARCH_CLASSES", payload: filtered });
    history.push(`${url}/${search}/results`);
    reset(initialValues);
  };
  return (
    <div className="SearchClassForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search for classes"
            ref={register({ required: true })}
          />
          {errors.search && <p className="error-search">Field required</p>}
        </label>
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchClassForm;
