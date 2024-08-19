import React, { createContext, useState, useContext } from "react";

const RecordsContext = createContext();

export const useRecords = () => useContext(RecordsContext);
const initialRecords = [
  {
    sideA:
      "Explain the benefits of the new software update in terms of system performance and user experience.",
    sideB: "What are the changes in the new software update?",
    input:
      "Assess the effectiveness of the prompts in eliciting detailed responses.",
    Q1: "Which prompt (sideA or sideB) is more effective in obtaining a comprehensive response?",
    Q2: "What makes the more effective prompt better?",
    Q3: "How could the less effective prompt be improved?",
    A1: "",
    A2: "",
    A3: "",
  },
  {
    sideA:
      "Discuss the key advantages of the electric car, focusing on range and acceleration.",
    sideB: "What are the features of the electric car?",
    input:
      "Evaluate the prompts for their ability to draw out detailed reviews.",
    Q1: "Which prompt (sideA or sideB) leads to a more detailed and informative review?",
    Q2: "Why does the more effective prompt work better?",
    Q3: "Suggestions for enhancing the less effective prompt?",
    A1: "",
    A2: "",
    A3: "",
  },
  {
    sideA:
      "Analyze the novel's exploration of themes and character development.",
    sideB: "What is the novel about?",
    input:
      "Determine the effectiveness of the prompts in generating insightful literary analysis.",
    Q1: "Which prompt (sideA or sideB) results in a more insightful analysis?",
    Q2: "What aspects of the more effective prompt contribute to its success?",
    Q3: "How can the less effective prompt be improved to elicit better analysis?",
    A1: "",
    A2: "",
    A3: "",
  },
];
export const RecordsProvider = ({ children }) => {
  // Sample test records

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
