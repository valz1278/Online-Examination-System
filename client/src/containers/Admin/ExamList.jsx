import React, { useEffect, useState } from "react";
import { createGetRequest, createDeleteRequest } from "../../api";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./ExamList.css";

const ExamList = () => {
  const [exams, setExam] = useState([]);
  const history = useHistory();

  useEffect(() => {
    createGetRequest("/api/quiz/teacher", setExam);
  }, []);

  const examClick = (id) => {
    history.push(`/teacher/exam/${id}`);
  };

  const enrollmentClick = (id) => {
    history.push(`/teacher/exam/enrollment/${id}`);
  };

  const deleteClick = (id) => {
    createDeleteRequest(`/api/quiz/teacher/${id}`);
    history.go();
  };

  return (
    <div className="listBox">
      {exams?.map((quiz) => (
        <div key={quiz._id}>
          <p>Quiz Name: {quiz.name}</p>
          <Button onClick={() => examClick(quiz._id)}>
            View Exam
          </Button>
          <Button onClick={() => enrollmentClick(quiz._id)}>
            View Enrollment
          </Button>
          <Button variant="danger" onClick={() => deleteClick(quiz._id)}>Delete Quiz</Button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ExamList;
