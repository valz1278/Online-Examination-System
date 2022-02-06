import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import ExamContext from "./ExamContext";

const DeleteFieldButton = ({ questionid }) => {
  const { setQuestion, questions } = useContext(ExamContext);
  const handleDeleteQuestion = () => {
    const temp = {};
    Object.assign(temp, questions);
    delete temp[questionid];
    setQuestion(temp);
  };
  return (
    <Button onClick={handleDeleteQuestion} variant="danger">
      Delete questions
    </Button>
  );
};

export default DeleteFieldButton;
