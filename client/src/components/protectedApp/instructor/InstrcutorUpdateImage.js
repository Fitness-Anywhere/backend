import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorUpdateImage = ({ uploadImage, img }) => {
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
