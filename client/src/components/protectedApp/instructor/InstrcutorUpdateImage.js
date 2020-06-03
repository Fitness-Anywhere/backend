import React from "react";

const InstructorUpdateImage = ({ uploadImage }) => {
  return (
    <form>
      <label htmlFor="profileImg">
        <input
          type="file"
          name="profileImg"
          id="profileImg"
          onChange={uploadImage}
        />
      </label>
    </form>
  );
};

export default InstructorUpdateImage;
