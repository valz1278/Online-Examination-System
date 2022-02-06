import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createPostRequest } from "../../../api";
import TextInput from "../TextInput";

const AddEnrollmentForm = ({ quizid, setUpdate }) => {
  const [data, setData] = useState("");
  const [fetch, setFetch] = useState(false);
  const onChange = (value) => {
    setData(value);
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (data)
      createPostRequest(
        "/api/enrollment/teacher",
        {
          quizid: quizid,
          studentId: data,
        },
        (data) => {
          setUpdate(data);
          setData("");
        },
        setFetch
      );
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <TextInput
            label="Student ID"
            type="text"
            name={quizid}
            value={data}
            onChange={onChange}
          />
        </div>
        <div>{fetch ? "loading" : <Button type="submit">Submit</Button>}</div>
      </div>
    </form>
  );
};

export default AddEnrollmentForm;
