import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createGetRequest, createPostRequest } from "../api";
import MultipleChoice from "../components/fields/MultipleChoice";
import TrueOrFalse from "../components/fields/TrueOrFalse";
import "./TeacherExam.css";

const TeacherExam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const [answer, setAnswer] = useState({});
  const history = useHistory();

  useEffect(() => {
    createGetRequest("/api/quiz/teacher/" + id, setExam);
  }, [id]);

  return (
    <div id="questions">
      <div>
        <p>Exam name: {exam.name}</p>
        <p>Exam duration: {exam.quiz_duration} minutes</p>
        {exam?.questions?.map((questions) => {
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
    </div>
  );
};

export default TeacherExam;
