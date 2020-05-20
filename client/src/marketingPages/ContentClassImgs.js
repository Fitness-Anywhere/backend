import React from "react";

const ContentClassImgs = ({ cls }) => {
  const { image_url, name } = cls;
  return (
    <div className="content-options-img">
      <img src={image_url} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default ContentClassImgs;
