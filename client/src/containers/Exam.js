import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createGetRequest, createPostRequest } from "../api";
import MultipleChoice from "../components/fields/MultipleChoice";
import TrueOrFalse from "../components/fields/TrueOrFalse";
import "./Exam.css";

import Timer from "../components/Widget/Timer";

const Exam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const [answer, setAnswer] = useState({});
  const history = useHistory();

  useEffect(() => {
    createGetRequest("/api/quiz/" + id, setExam);
  }, [id]);

  const onSubmit = () => {
    const form = {
      quizid: id,
      answers: answer,
      teacher: exam.quiz.teacher,
    };
    createPostRequest(
      "/api/quiz/submit",
      form,
      () => {},
      () => {},
      () => {},
      (err, result) => {
        if (result === "OK") {
          history.push("/results");
        }
      }
    );
  };

  const onTimeout = () => {
    document.getElementById("clickButton").click();
  };

  return (
    <div id="questions">
      <Timer duration={exam?.quiz?.quiz_duration} onTimeout={onTimeout} />
      <div>
        {exam?.quiz?.questions?.map((questions) => {
          if (questions.type === "mcq") {
            return (
              <MultipleChoice
                data={questions}
                setAnswer={setAnswer}
                key={questions._id}
              />
            );
          } else if (questions.type === "tof") {
            return (
              <TrueOrFalse
                data={questions}
                setAnswer={setAnswer}
                key={questions._id}
              />
            );
          }
          return null;
        })}
      </div>
      <div>
        <button id="clickButton" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Exam;
