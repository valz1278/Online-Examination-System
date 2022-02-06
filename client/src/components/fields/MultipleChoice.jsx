import React from "react";

const MultipleChoice = ({ data, setAnswer }) => {
  
  const onChange = (ev) => {
    const value = ev.target.value;
    setAnswer((prev) => ({ ...prev, [data._id]: value }));
  };

  return (
    <div>
      <p>{data.question}</p>
      <div>
        {data.choices.map((choice) => (
          <div key={choice._id}>
            <input type="radio" name={data._id} value={choice.value} onChange={onChange}/>
            <label htmlFor={choice._id}>{choice.label}</label>
          </div>
        ))}
      </div>    
      <br />
    </div>

  );
};

export default MultipleChoice;