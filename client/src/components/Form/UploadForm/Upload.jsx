import React, { useContext } from "react";
import * as XLSX from "xlsx";

import ExamContext from "./ExamContext";

const Excel = () => {
  const { questions } = useContext(ExamContext);

  const onImportExcel = (file) => {
    //  gets the uploaded file object
    const { files } = file.target;

    //  the file is read through the filereader object

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const { result } = event.target;

        //  the entire excel spreadsheet object is read as a binary stream

        const workbook = XLSX.read(result, { type: "binary" });

        //  stores the retrieved data

        let rawData = [];

        //  walk through each sheet to read （ by default, only the first table is read ）

        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line

          if (workbook.Sheets.hasOwnProperty(sheet)) {
            //  using sheet_to_json  method will be excel  into json  data

            rawData = rawData.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );

            break; //  if you only take the first table, uncomment the row
          }
        }

        rawData.forEach((object) => {
          if (!questions[object.question]) {
            if (object.type === "mcq") {
              questions[object.question] = {
                type: object.type,

                score: object.score,
                question: object.question,
                answer: object.answer,
                choices: [],
              };
            } else if (object.type === "tof") {
              questions[object.question] = {
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
            questions[object.question].choices.push(choice);
          }
        });

        // const out = [];
        // Object.keys(questions).forEach((question) => {
        //   out.push(questions[question]);
        // });
        // console.log(out);
        //  finally obtained and formatted json  data

        console.log(" uploaded successfully ！");

        
      } catch (e) {
        //  here you can throw a hint that the file type error is incorrect

        console.log(" incorrect file type ！");
      }
    };

    //  open the file in binary mode

    fileReader.readAsBinaryString(files[0]);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" id="uploadFile" onChange={(event) => onImportExcel(event)}/>
      <span> upload a file </span>
      <p> support. xlsx、.xls file format </p>
    </div>
  );
};

export default Excel;
