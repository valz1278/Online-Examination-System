import { createContext } from "react";

const ExamContext = createContext({
  setExam: () => {},
  setQuestion: () => {},
  questions: {},
  exam: {},
});

export default ExamContext;
