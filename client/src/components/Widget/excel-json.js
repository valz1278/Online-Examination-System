import React from "react";

const xlsx = require("xlsx");

const Convert = ({ data }) => {

  const wb = xlsx.readFile("./Data.xslx");

  const ws = wb.Sheets["Sheet1"];

  const rawJson = xlsx.utils.sheet_to_json(ws);

  const temp = {};

  rawJson.forEach((object) => {
    if (!temp[object.question]) {
      if (object.type === "mcq") {
        temp[object.question] = {
          type: object.type,

          score: object.score,
          question: object.question,
          answer: object.answer,
          choices: [],
        };
      } else if (object.type === "tof") {
        temp[object.question] = {
          type: object.type,
          score: object.score,
          question: object.question,
          answer: object.answer,
        };
      }
    }
    if (object.choice) {
      let choice = {};
      choice["label"] = object.choice;
      choice["value"] = object.choice;
      temp[object.question].choices.push(choice);
    }
  });

  const out = [];
  Object.keys(temp).forEach((question) => {
    out.push(temp[question]);
  });

  return out;
};

export default Convert;
