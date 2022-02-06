import React from "react";

const Text = ({ data, setAnswer }) => {
  const onChange = (ev) => {
    setAnswer((prev) => ({ ...prev, [data._id]: ev.target.value }));
  };
  return (
    <div>
      <p>{data?.question}: </p>
      <input type="radio" name={data._id} value="True" onChange={onChange} id="true"/>
      <label htmlFor="true">True</label>
      <input type="radio" name={data._id} value="False" onChange={onChange} id="false"/>
      <label htmlFor="false">False</label>
      <br /><br />
    </div>
    
  );
};

export default Text;
