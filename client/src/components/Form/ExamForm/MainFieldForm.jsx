import React, { useContext } from "react";
import TextInput from "../TextInput";
import ExamContext from "./ExamContext";

const fields = [
  {
    name: "name",
    label: "Exam name",
    required: true,
  },
  {
    name: "quiz_duration",
    label: "Exam Duration",
    type: "number",
    required: true,
  },
  {
    name: "start_date",
    label: "Start Date",
    type: "datetime-local",
    required: true,
  },
  {
    name: "end_date",
    label: "End Date",
    required: true,
    type: "datetime-local",
  }, 
];

// parseInt("123")

const MainFieldForm = () => {
  const { setExam, exam } = useContext(ExamContext);

  const handleChange = (value, name) => {
    setExam((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div>
      {fields.map((field) => (
        <TextInput
          key={field.name}
          {...field}
          onChange={handleChange}
          value={exam[field.name]}
        />
      ))}
    </div>
  );
};

export default MainFieldForm;
