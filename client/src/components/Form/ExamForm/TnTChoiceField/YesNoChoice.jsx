import React, { useContext } from 'react'
import ExamContext from "../ExamContext";

const YesNoChoice = ({questionid}) => {
    const { questions, setQuestion } = useContext(ExamContext);

    const question = questions[questionid];
    const handleChange = (ev) => {
        const value = ev.target.value
        const updatedQuestion =  {
            ...question,
            answer: value
        }
        setQuestion((prev) => ({ ...prev, [questionid]: updatedQuestion }));
    }
    return (
        <div>
        <select onChange={handleChange}>
            <option value=""></option>
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
        </select>
        </div>
    )
}

export default YesNoChoice