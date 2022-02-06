import React, { useContext } from "react";
import ExamContext from "../ExamContext";
import TextInput from "../../TextInput";
import YesNoChoice from "./YesNoChoice";
import ScoreField from "../ScoreField";

const TnTChoiceField = ({ questionid }) => {
  const { questions, setQuestion } = useContext(ExamContext);
  const question = questions[questionid];

  const handleQuestionChange = (value) => {
    const updatedQuestion = {
      ...question,
      question: value,
    };
    setQuestion((prev) => ({ ...prev, [questionid]: updatedQuestion }));
  };
  return (
    <div>
      <TextInput
        name={questionid}
        value={questions[questionid]?.question}
        label="Question : "
        onChange={handleQuestionChange}
      />
      <YesNoChoice questionid={questionid}/>
      <ScoreField questionid={questionid}/>
    </div>
  );
};

export default TnTChoiceField;
