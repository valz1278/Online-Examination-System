import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../button/LoaderButton";
import AddNewButton from "./AddNewButton";
import ExamContext from "./ExamContext";
import ListofQuestions from "./ListofQuestions";
import MainFieldForm from "./MainFieldForm";

const ExamForm = ({ handleSubmit,isLoading }) => {
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

        <h1>Questions </h1>
        <ListofQuestions />
        <AddNewButton />
        {
          isLoading ? <span>Loading</span> : <LoaderButton type="submit">Submit </LoaderButton>
        }
      </Form>
    </ExamContext.Provider>
  );
};

export default ExamForm;
