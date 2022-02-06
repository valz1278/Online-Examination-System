import React, { useContext } from "react";
import DeleteFieldButton from "./DeleteFieldButton";

import ExamContext from "./ExamContext";
import MultipleChoiceField from "./MultipleChoiceField";
import TnTChoiceField from "./TnTChoiceField";

const ListofQuestions = () => {
  const { questions } = useContext(ExamContext);
  const el = [];
  Object.keys(questions).forEach((id, idx) => {
    const question = questions[id];
    if (question.type === "mcq")
      el.push(
        <div key={id}>
          <div>
            Question {idx + 1} <DeleteFieldButton questionid={id} />
          </div>
          <MultipleChoiceField id={id} key={id} />
        </div>
      );
    else if (question.type === "tof")
      el.push(
        <div key={id}>
          <div>
            Question {idx + 1} <DeleteFieldButton questionid={id} />
            <TnTChoiceField questionid={id} />
          </div>
        </div>
      );
  });
  return el;
};

export default ListofQuestions;
