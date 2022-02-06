import React, { useContext } from "react";
import TextInput from "../../TextInput";
import ExamContext from "../ExamContext";
import MCQAddChoice from "./MCQAddChoice";
import MCQChoices from "./MCQChoices";

import ScoreField from '../ScoreField';
const MultipleChoiceField = ({ id }) => {
  const { questions, setQuestion } = useContext(ExamContext);
  const question = questions[id];

  const handleQuestion = (value) => {
    const updatedQuestion = {
      ...question,
      question: value,
    };
    setQuestion((prev) => ({ ...prev, [id]: updatedQuestion }));
  };
  return (
    <div>
      <TextInput
        name={id}
        value={questions[id]?.question}
        label="Question :"
        onChange={handleQuestion}
      />

      {question?.choices?.map((choice) => (
        <MCQChoices key={choice.id} id={id} choiceID={choice.id} />
      ))}
      <MCQAddChoice id={id} />
      <ScoreField questionid={id}/>
    </div>
  );
};

export default MultipleChoiceField;
