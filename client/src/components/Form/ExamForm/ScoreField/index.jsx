import React, { useContext } from "react";
import TextInput from "../../TextInput";
import ExamContext from "../ExamContext";

const ScoreField = ({ questionid }) => {
  const { questions, setQuestion } = useContext(ExamContext);
  const question = questions[questionid];
  const onChange = (value) => {
    const updatedQuestion = {
      ...question,
      score: value,
    };
    setQuestion((prev) => ({ ...prev, [questionid]: updatedQuestion }));
  };
  return (
    <div>
      <TextInput
        label="Score: "
        value={question?.score}
        onChange={onChange}
        inputStyle={{
          width: "100px"
        }}
        type="number" 
        required={true}
        name={`score-${questionid}`}
      />
    </div>
  );
};

export default ScoreField;
