import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createPutRequest } from "../../../api";

const StudentEnrollmentitem = ({ data, setUpdate }) => {
  const [fetch, setFetch] = useState(false);

  const handleDelete = () => {
    createPutRequest(
      "/api/enrollment/teacher",
      {
        quizid: data.quiz,
        studentId: data?.student?.studentId,
      },
      (data) => {
        setUpdate(data);
      },
      setFetch
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <p>Name: {data?.student?.name}</p>
        <p>Student ID: {data?.student?.studentId}</p>
      </div>
      <div>
        {fetch ? (
          "loading"
        ) : (
          <Button variant="danger" onClick={handleDelete}>
            Delete student
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentEnrollmentitem;
