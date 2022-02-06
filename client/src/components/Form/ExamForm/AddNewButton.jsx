import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ExamContext from "./ExamContext";

const newQuestion = (type) => {
  const question = { type, score: 0, question: "", answer: "" };
  if (type === "mcq") question.choices = [];
  return question;
};

const AddNewButton = () => {
  const { setQuestion } = useContext(ExamContext);
  const handleMCQClick = () => {
    setQuestion((prev) => ({ ...prev, [Date.now()]: newQuestion("mcq") }));
  };

  const handleTnTClick = () => {
    setQuestion((prev) => ({ ...prev, [Date.now()]: newQuestion("tof") }));
  };
  return (
    <div className="d-flex mb-3">
      <div className="flex">
        <Button onClick={handleMCQClick}>
          Add new multiple choice question
        </Button>
      </div>
      <div className="flex">
        <Button onClick={handleTnTClick}>Add new tof question</Button>
      </div>
    </div>
  );
};

export default AddNewButton;
