import React from "react";
import SingleClass from "./SingleClass";

const ClientDisplayClasses = ({ allClasses, joinClass }) => {
  return (
    <div className="ClientDisplayClasses">
      <h3>Search and join classes now</h3>
      <div className="ClientDisplayClasses-wrapper">
        {allClasses.map((cls) => (
          <SingleClass
            key={cls.id}
            cls={cls}
            joinClass={() => joinClass(cls)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientDisplayClasses;
