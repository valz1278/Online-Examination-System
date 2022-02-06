import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../button/LoaderButton";
import ExamContext from "./ExamContext";
import MainFieldForm from "./MainFieldForm";
import Upload from "./Upload";

const ExamForm = ({ handleSubmit, isLoading }) => {
  const [exam, setExam] = useState({});
  const [questions, setQuestion] = useState({});
  
  const onSubmit = (ev) => {
    ev.preventDefault();
    const arrayOfQuestions = []
    Object.values(questions).forEach((e)=>arrayOfQuestions.push(e))
    handleSubmit({ ...exam, questions:arrayOfQuestions });
  };

  return (
    <ExamContext.Provider value={{ exam, setExam, questions, setQuestion }}>
      <Form onSubmit={onSubmit}>
        <MainFieldForm />

        <Upload />
        {
          isLoading ? <span>Loading</span> : <LoaderButton type="submit">Submit </LoaderButton>
        }
      </Form>
    </ExamContext.Provider>
  );
};

export default ExamForm;
