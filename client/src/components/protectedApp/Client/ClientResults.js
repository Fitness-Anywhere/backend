import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Sharednav from "../Sharednav";
import SingleResult from "./SingleResult";

const ClientResults = () => {
  const { id, type } = useParams();
  const reducer = useSelector((state) => state.clientReducer.filterClasses);
  console.log(type);
  return (
    <div className="ClientResults">
      <Sharednav />
      <div className="ClientResults-wrapper">
        <div className="ClientResults-show">
          {reducer.length > 0 ? (
            <h3>{`Results for '${type}'`}</h3>
          ) : (
            <h3>{`Not results found for '${type}'`}</h3>
          )}

          {reducer.length > 0 ? (
            <div className="display-results">
              {reducer.map((cls) => (
                <SingleResult key={cls.id} cls={cls} />
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="go-back">
            <Link to={`/account/client/${id}`}>Go back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientResults;
