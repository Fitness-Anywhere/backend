import React from "react";
import InstructorCardClass from "./InstructorCardClass";

const DisplayInstructorsClasses = ({ classes, deleteClass }) => {
  return (
    <div className="DisplayInstructorClasses">
      {classes.map((clss) => (
        <InstructorCardClass
          key={clss.id}
          clss={clss}
          deleteClass={() => deleteClass(clss)}
        />
      ))}
    </div>
  );
};

export default DisplayInstructorsClasses;
