import _ from "lodash";
import React, { useContext, useRef } from "react";
import TextInput from "../../TextInput";
import ExamContext from "../ExamContext";
import MCQRemoveChoice from "./MCQRemoveChoice";

const MCQChoices = ({ id, choiceID }) => {
  const { questions, setQuestion } = useContext(ExamContext);
  const radioButtonRef = useRef(null);

  const question = questions[id];

  const idx = _.findIndex(question.choices, { id: choiceID });
  const choice = question.choices[idx];

  const handleChoiceChange = () => {
    const updatedQuestion = {
      ...question,
      answer: question.choices[idx].value,
    };

    setQuestion((prev) => ({
      ...prev,
      [id]: updatedQuestion,
    }));
  };

  const handleChoiceLabelChange = (value) => {
    const newChoice = {
      id: choice.id,
      value: value,
      label: value,
    };

    const updatedChoice = question.choices;
    updatedChoice[idx] = newChoice;

    const updatedQuestion = {
      ...question,
      choices: updatedChoice,
    };
    if (radioButtonRef?.current?.checked) {
      updatedQuestion.answer = value;
    }
    setQuestion((prev) => ({
      ...prev,
      [id]: updatedQuestion,
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <input
            ref={radioButtonRef}
            type="radio"
            name={id}
            onChange={handleChoiceChange}
            value={id}
          />
        </div>
        <div>
          <TextInput
            name={choiceID}
            onChange={handleChoiceLabelChange}
            value={choice.label}
          />
        </div>
        <div>
          <MCQRemoveChoice questionid={id} choiceid={choiceID} />
        </div>
      </div>
    </div>
  );
};

export default MCQChoices;
