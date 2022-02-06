import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ExamContext from "../ExamContext";

const MCQAddChoice = ({ id }) => {
  const { setQuestion, questions } = useContext(ExamContext);
  const handleAddChoice = () => {
    try {
      const newChoice = {
        id: Date.now(),
        label: "",
        value: "",
      };
      const question = questions[id];
      question.choices.push(newChoice);
      setQuestion((prev) => ({ ...prev, [id]: question }));
    } catch (err) {
      console.error(err);
    }
  };
  return <Button onClick={handleAddChoice}>Add Choices</Button>;
};

export default MCQAddChoice;
