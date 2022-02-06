import React, { useEffect, useState } from "react";
import { createGetRequest } from "../api";
import Button from "react-bootstrap/Button";
import "./ExamList.css"

const ExamList = () => {
  const [exams, setExam] = useState([]);
  
  useEffect(() => {
    createGetRequest("/api/enrollment/student", setExam);
  }, []);

  return (
    <div className="listBox">
      {exams?.map(({ quiz }) => (
        <div key={quiz?._id}>
        <p>{quiz?.name}</p>
        <Button href={`/exam/${quiz?._id}`}>Go to exam</Button>
        </div>
      ))}
    </div>
  );
};

export default ExamList;