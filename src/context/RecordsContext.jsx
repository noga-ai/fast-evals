import React, { createContext, useState, useContext } from "react";

const RecordsContext = createContext();

export const useRecords = () => useContext(RecordsContext);

export const RecordsProvider = ({ children }) => {
  // Sample test records
  const initialRecords = [
    {
      sideA: "This is side A of record 1",
      sideB: "This is side B of record 1",
      input: "This is the input for record 1",
      Q1: "What is your evaluation of side A?",
      Q2: "What is your evaluation of side B?",
      Q3: "Any additional comments?",
      A1: "",
      A2: "",
      A3: "",
    },
    {
      sideA: "This is side A of record 2",
      sideB: "This is side B of record 2",
      input: "This is the input for record 2",
      Q1: "How does side A compare to side B?",
      Q2: "What improvements can be made to side B?",
      Q3: "Overall rating for this comparison?",
      A1: "",
      A2: "",
      A3: "",
    },
  ];

  const [records, setRecords] = useState(initialRecords);
  const [outputs, setOutputs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState({
    Q1: "Q1",
    Q2: "Q2",
    Q3: "Q3",
  });

  return (
    <RecordsContext.Provider
      value={{
        records,
        setRecords,
        outputs,
        setOutputs,
        currentIndex,
        setCurrentIndex,
        questions,
        setQuestions,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};
