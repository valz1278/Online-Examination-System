import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createGetRequest } from "../../api";
import AddEnrollmentForm from "../../components/Form/AddEnrollmentForm";
import StudentEnrollmentitem from "./components/StudentEnrollmentitem";

const Enrollment = () => {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    createGetRequest("/api/enrollment/quiz/" + id, setEnrollment);
  }, [id, update]);

  return (
    <div>
      {enrollment?.map((enrollment) => (
        <StudentEnrollmentitem
          data={enrollment}
          setUpdate={setUpdate}
          key={enrollment?._id}
        />
      ))}
      <div>
        <h2>Add new student to enrollment</h2>
        <AddEnrollmentForm quizid={id} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default Enrollment;
