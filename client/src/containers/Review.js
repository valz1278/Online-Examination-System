import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createGetRequest } from "../api";
import "./Review.css";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Exam = () => {
  const { id } = useParams();
  const [result, setResult] = useState([]);

  useEffect(() => {
    createGetRequest("/api/result/" + id, setResult);
  }, [id]);

  const icon = (final) => {
    if(final)
      return <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }}/>
    else
      return <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
  }
  
  function renderResult() {
    return (
      <div>
        <p>Exam: {result?.quiz?.name}</p>
        <p>Total Score: {result?.final_score}</p>
        <br />
        {result?.answers?.map((value, i) => (
          <div key={result.answers[i]._id}>
            <p>
              {i + 1}.) {result.quiz.questions[i].question}
            </p>
            <p>Your answer: {result.answers[i].student_answer} {icon(result.answers[i].final)}</p>
            <p>Actual answer: {result.answers[i].actual_answer}</p>
            <p>Score: {result.answers[i].score} </p>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return <div id="results">{renderResult()}</div>;
};

export default Exam;
