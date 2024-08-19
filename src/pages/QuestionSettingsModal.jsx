import React from "react";
import { useRecords } from "../context/RecordsContext";
import { useNavigate } from "react-router-dom";

function QuestionSettingsModal() {
  const { questions, setQuestions } = useRecords();
  const navigate = useNavigate();

  const handleQuestionChange = (key, value) => {
    setQuestions({ ...questions, [key]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Question Settings</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Question 1</label>
          <input
            type="text"
            value={questions.Q1}
            onChange={(e) => handleQuestionChange("Q1", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Example Answer 1</label>
          <input
            type="text"
            value={questions.exampleA1 || ""}
            onChange={(e) => handleQuestionChange("exampleA1", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Question 2</label>
          <input
            type="text"
            value={questions.Q2}
            onChange={(e) => handleQuestionChange("Q2", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Example Answer 2</label>
          <input
            type="text"
            value={questions.exampleA2 || ""}
            onChange={(e) => handleQuestionChange("exampleA2", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Question 3</label>
          <input
            type="text"
            value={questions.Q3}
            onChange={(e) => handleQuestionChange("Q3", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Example Answer 3</label>
          <input
            type="text"
            value={questions.exampleA3 || ""}
            onChange={(e) => handleQuestionChange("exampleA3", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}

export default QuestionSettingsModal;
