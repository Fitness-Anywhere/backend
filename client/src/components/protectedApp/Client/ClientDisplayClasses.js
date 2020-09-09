import React from "react";
import SingleClass from "./SingleClass";

const ClientDisplayClasses = ({ allClasses, joinClass }) => {
  return (
    <div className="ClientDisplayClasses">
      {allClasses.length ? (
        <>
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
        </>
      ) : (
        <h3>No classes available</h3>
      )}
    </div>
  );
};

export default ClientDisplayClasses;
