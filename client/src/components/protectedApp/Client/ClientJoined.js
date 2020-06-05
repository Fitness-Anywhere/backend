import React from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useDispatch } from "react-redux";

const ClientJoined = ({ cls }) => {
  //   const { image_url } = cls;
  const { id } = useParams();
  const dispatch = useDispatch();

  const deleteJoined = async () => {
    try {
      await axiosWithAuth().delete(`/api/clients/${id}/classes/${cls.id}`);
      const res = await axiosWithAuth().get(`/api/clients/${id}/classes`);
      dispatch({
        type: "SAVING_JOINED_CLASSES",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="InstructorCardClass">
      <Link to={`/account/client/${id}/${cls.id}/more-info`}>
        <div className="InstructorCardClass-img">
          <img src={cls.image_url} alt={cls.name} />
        </div>
      </Link>
      <div className="InstructorCardClass-description">
        <div
          className="delete-joined"
          id="delete-joined"
          onClick={deleteJoined}
        >
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  );
};

export default ClientJoined;
