import React from "react";
import SearchClassForm from "./SearchClassForm";

const Header = () => {
  return (
    <div className="client-Header">
      <div className="client-center">
        <h1>Providing an easy way for client to meet with instructors</h1>
        <p>
          explore and book classes from your phone, yoga, Pilates, barre, HIIT,
          and meditation without leaving your living room.
        </p>
        <SearchClassForm />
      </div>
    </div>
  );
};

export default Header;
