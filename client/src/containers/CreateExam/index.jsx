import React, {useState} from "react";
import { createPostRequest } from "../../api";
import { useHistory } from 'react-router-dom';
import ExamForm from "../../components/Form/ExamForm";

const CreateExam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (form) => {
    createPostRequest('/api/quiz/teacher',form,()=>{},setIsLoading,()=>{},()=>{});
    history.push('/teacher/exam');
  };

  return <ExamForm handleSubmit={handleSubmit} isLoading={isLoading}/>;
};

export default CreateExam;
