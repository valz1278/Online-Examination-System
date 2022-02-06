import React, { useState } from "react";
import { createPostRequest } from "../../api";
import { useHistory } from "react-router-dom";

import UploadForm from "../../components/Form/UploadForm";

const CreateExam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (form) => {
    createPostRequest(
      "/api/quiz/teacher",
      form,
      () => {},
      setIsLoading,
      () => {},
      () => {}
    );
    history.push("/teacher/exam");
  // console.log(form);
  };
  
  return <UploadForm handleSubmit={handleSubmit} isLoading={isLoading} />;
};

export default CreateExam;
