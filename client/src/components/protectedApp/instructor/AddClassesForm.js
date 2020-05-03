import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "100%",
      // display: "block",
    },
  },
}));

const initialValues = {
  name: "",
  type: "",
  location: "",
  start_time: "",
  intensity: "",
  status: "",
  price: "",
  duration: "",
  file: "",
  max_class_size: "",
  description: "",
};

const getTime = new Date();

const AddClassesForm = ({ setUpdateData }) => {
  const { register, errors, handleSubmit, reset } = useForm({
    initialValues,
  });
  const dispatch = useDispatch();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const [selectedTime, setSelectedTime] = useState(getTime);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [img, setImg] = useState("");

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    if (id) {
      dispatch({ type: "SAVE_INSTRUCTOR_ID", payload: id });
    }
  }, [dispatch]);

  const { instructorID } = reducer.userReducer;

  const classes = useStyles();

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString());
  };

  const onSubmit = (values) => {
    const datesFormatted = `${selectedDate} ${selectedTime.toLocaleTimeString()}`;
    const {
      name,
      type,
      location,
      start_time,
      intensity,
      price,
      duration,
      max_class_size,
      description,
      image_url,
    } = values;
    const newValues = {
      name,
      type,
      location,
      start_time: datesFormatted,
      intensity,
      price,
      duration,
      max_class_size,
      description,
      image_url: img,
    };

    dispatch({ type: "FETCHING_ADDING_CLASSES" });
    axiosWithAuth()
      .post(`/api/instructors/${instructorID}/classes`, newValues)
      .then((res) => {
        //   console.log(res);
        dispatch({ type: "ADDED_CLASS_SUCCESSFULLY" });
        setUpdateData(res.data);
        reset({ initialValues });
        setImg("");
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ADDING_CLASS",
          payload: err.response.data.errorMessage,
        });
        console.log(err.response.data.errorMessage);
      });
  };

  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "pl2czq6m");
    formData.append("file", files);

    axios
      .post(`https://api.cloudinary.com/v1_1/dedps0vtx/image/upload`, formData)
      .then((res) => {
        setImg(res.data.secure_url);
      })
      .catch((err) => [console.log(err)]);
  };

  //   console.log("errors here ", errors);
  // {
  //   errors.name && <p className="error">{errors.name}</p>;
  // }

  return (
    <div className="AddClassesForm">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <div className="div-parent">
          <div className="div-one">
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="class name"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.name && <p className="error">Field required</p>}
            </label>

            <label htmlFor="type">
              <input
                type="text"
                id="type"
                name="type"
                placeholder="class type"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.type && <p className="error">Field required</p>}
            </label>
            <label htmlFor="location">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="class adress"
                ref={register({ required: true, minLength: 15 })}

                //  as={TextField}
              />
              {errors.location && errors.location.type === "required" && (
                <p className="error">Field required</p>
              )}
              {errors.location && errors.location.type === "minLength" && (
                <p className="error">Please enter full address</p>
              )}
            </label>
            <label htmlFor="intensity">
              <input
                type="number"
                id="intensity"
                name="intensity"
                placeholder="class intensity"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.intensity && <p className="error">Field required</p>}
            </label>
          </div>
          <div className="div-two">
            <label htmlFor="status">
              <input
                type="text"
                id="status"
                name="status"
                placeholder="class status 'optional' "

                //  as={TextField}
              />
            </label>
            <label htmlFor="price">
              <input
                type="number"
                id="price"
                name="price"
                placeholder="class price"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.price && <p className="error">Field required</p>}
            </label>

            <label htmlFor="duration">
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="class duration"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.duration && <p className="error">Field required</p>}
            </label>
            <label htmlFor="max_class_size">
              <input
                type="number"
                id="max_class_size"
                name="max_class_size"
                placeholder="max class size"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.max_class_size && <p className="error">Field required</p>}
            </label>
          </div>
          <div className="div-three">
            <label htmlFor="description">
              <input
                type="text"
                id="description"
                name="description"
                placeholder="description of class"
                ref={register({ required: true })}

                //  as={TextField}
              />
              {errors.description && <p className="error">Field required</p>}
            </label>

            <label>
              <input
                className="file"
                type="file"
                name="file"
                onChange={uploadImage}
                //   as={TextField}
                ref={register({ required: true })}
              />
              {errors.file && <p className="error">Field required</p>}
            </label>
          </div>
        </div>
        <section className="date-time-picker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              className="time-picker"
              margin="normal"
              id="time-picker"
              label="class start time"
              value={selectedTime}
              onChange={handleTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="class date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </section>

        <div className="btn-add">
          <button type="submit">Add class</button>
        </div>
      </form>
    </div>
  );
};

export default AddClassesForm;

//   <Formik
//  initialValues={{
//    name: "",
//    type: "",
//    location: "",
//    start_time: "",
//    intensity: "",
//    status: "",
//    price: "",
//    duration: "",
//    max_class_size: "",
//    description: "",
//  }}
//     validationSchema={validationSchema}
//     onSubmit={(values, { resetForm }) => {
// const datesFormatted = `${selectedDate} ${selectedTime.toLocaleTimeString()}`;
// const {
//   name,
//   type,
//   location,
//   start_time,
//   intensity,
//   price,
//   duration,
//   max_class_size,
//   description,
//   image_url,
// } = values;
// const newValues = {
//   name,
//   type,
//   location,
//   start_time: datesFormatted,
//   intensity,
//   price,
//   duration,
//   max_class_size,
//   description,
//   image_url: img,
// };

//       axiosWithAuth()
//         .post(`/api/instructors/${instructorID}/classes`, newValues)
//         .then((res) => {
//           setUpdateData(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       resetForm();
//     }}
//   >
//     {() => (
//       <Form className={classes.root}>
//   <label htmlFor="name">
//     <Field
//       type="text"
//       id="name"
//       name="name"
//       placeholder="class name"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="type">
//     <Field
//       type="text"
//       id="type"
//       name="type"
//       placeholder="class type"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="location">
//     <Field
//       type="text"
//       id="location"
//       name="location"
//       placeholder="class address"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="intensity">
//     <Field
//       type="number"
//       id="intensity"
//       name="intensity"
//       placeholder="class intensity"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="status">
//     <Field
//       type="text"
//       id="status"
//       name="status"
//       placeholder="class status 'optional' "
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="price">
//     <Field
//       type="number"
//       id="price"
//       name="price"
//       placeholder="class price"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="duration">
//     <Field
//       type="number"
//       id="duration"
//       name="duration"
//       placeholder="class duration"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="max_class_size">
//     <Field
//       type="number"
//       id="max_class_size"
//       name="max_class_size"
//       placeholder="max class size"
//       //  as={TextField}
//     />
//   </label>
//   <label htmlFor="description">
//     <Field
//       type="text"
//       id="description"
//       name="description"
//       placeholder="desctioption of class"
//       //  as={TextField}
//     />
//   </label>

//   <label>
//     <Field
//       className="file"
//       type="file"
//       name="file"
//       onChange={uploadImage}
//       //   as={TextField}
//     />
//   </label>
//   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//     <KeyboardTimePicker
//       className="time-picker"
//       margin="normal"
//       id="time-picker"
//       label="class start time"
//       value={selectedTime}
//       onChange={handleTimeChange}
//       KeyboardButtonProps={{
//         "aria-label": "change time",
//       }}
//     />

//     <KeyboardDatePicker
//       margin="normal"
//       id="date-picker-dialog"
//       label="class date"
//       format="MM/dd/yyyy"
//       value={selectedDate}
//       onChange={handleDateChange}
//       KeyboardButtonProps={{
//         "aria-label": "change date",
//       }}
//     />
//   </MuiPickersUtilsProvider>

//   <div className="btn-add">
//     <button type="submit">Add class</button>
//   </div>
//       </Form>
//     )}
//   </Formik>;
