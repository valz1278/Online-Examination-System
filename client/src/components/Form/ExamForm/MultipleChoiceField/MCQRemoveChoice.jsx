import _ from "lodash";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ExamContext from "../ExamContext";

const MCQRemoveChoice = ({ questionid, choiceid }) => {
  const { questions, setQuestion } = useContext(ExamContext);
  const handleRemove = () => {
    const question = questions[questionid];
    const choices = question.choices;

    const idx = _.findIndex(choices, { id: choiceid });
    choices.splice(idx, 1);

    const updatedQuestion = {
      ...question,
      choices,
    };

    setQuestion((prev) => ({
      ...prev,
      [questionid]: updatedQuestion,
    }));
  };

  return (
    <Button onClick={handleRemove} variant="danger">
      Remove
    </Button>
  );
};

export default MCQRemoveChoice;
