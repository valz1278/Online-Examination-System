import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { createGetRequest } from "../api";
import "./ResultTeacher.css";

const ExamList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    createGetRequest("/api/result/teacher", setResults);
  }, []);
  
  const renderResults = () => {
    return (
      <div className="results">
        {results?.map((results) => (
          <div key={results._id}>
            <p>Quiz name: {results.quiz.name}</p>
            <p>Exam taker: {results.student.studentId}</p>
            <p>Submission Date: {results.date_submit}</p>
            <p>Score: {results.final_score}</p>
            <div className="button"><Button href={`/teacher/results/${results._id}`}>Review result</Button></div>
            <br />
            <br />
          </div>
        ))}
      </div>
    );
  };

  return <div className="resultBox">{renderResults()}</div>;
};

export default ExamList;
