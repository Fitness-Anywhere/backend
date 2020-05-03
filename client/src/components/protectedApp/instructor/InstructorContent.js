import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddClassesForm from "./AddClassesForm";

const InstructorContent = ({ setUpdateData, instructorClass }) => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.userReducer);
  const { addClassSuccessfull } = reducer;

  setTimeout(() => {
    if (addClassSuccessfull) {
      dispatch({ type: "HIDE_ADD_SUCCESSFULL_MESSAGE" });
    }
  }, 4000);

  //   console.log("reducer here ", reducer);
  return (
    <div className="Content">
      <h3>Schedule</h3>
      {addClassSuccessfull && <h4>class added succesfully</h4>}
      {instructorClass.length === 0 && (
        <div className="no-classes">
          <p>Looks like you don't have any classes yet</p>
          <p>let's add some.</p>
        </div>
      )}

      <AddClassesForm setUpdateData={setUpdateData} />
    </div>
  );
};

export default InstructorContent;
