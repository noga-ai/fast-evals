import React, { useState, useEffect } from "react";

function QuestionsSettings({ setQuestions }) {
  const [questionList, setQuestionList] = useState({
    Q1: localStorage.getItem("Q1Text") || "Q1",
    Q2: localStorage.getItem("Q2Text") || "Q2",
    Q3: localStorage.getItem("Q3Text") || "Q3",
  });

  useEffect(() => {
    setQuestions(questionList);
    localStorage.setItem("Q1Text", questionList.Q1);
    localStorage.setItem("Q2Text", questionList.Q2);
    localStorage.setItem("Q3Text", questionList.Q3);
  }, [questionList, setQuestions]);

  const handleQuestionChange = (key, value) => {
    setQuestionList({ ...questionList, [key]: value });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Question Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Question 1</label>
        <input
          type="text"
          value={questionList.Q1}
          onChange={(e) => handleQuestionChange("Q1", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Question 2</label>
        <input
          type="text"
          value={questionList.Q2}
          onChange={(e) => handleQuestionChange("Q2", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Question 3</label>
        <input
          type="text"
          value={questionList.Q3}
          onChange={(e) => handleQuestionChange("Q3", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}

export default QuestionsSettings;
