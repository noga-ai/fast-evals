import React, { useState, useEffect } from "react";
import { useRecords } from "../context/RecordsContext";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const EvaluationPage = () => {
  const {
    records,
    currentIndex,
    setCurrentIndex,
    outputs,
    setOutputs,
    questions,
  } = useRecords();

  const [answers, setAnswers] = useState({
    A1: "",
    A2: "",
    A3: "",
  });

  const [lastRecordAdded, setLastRecordAdded] = useState(false);

  useEffect(() => {
    if (records.length > 0) {
      const currentRecord = records[currentIndex];
      setAnswers({
        A1: currentRecord.A1 || "",
        A2: currentRecord.A2 || "",
        A3: currentRecord.A3 || "",
      });
    }
  }, [currentIndex, records]);

  const handleNextOrAddLast = () => {
    const newOutput = {
      ...records[currentIndex],
      A1: answers.A1,
      A2: answers.A2,
      A3: answers.A3,
    };

    setOutputs([...outputs, newOutput]);

    if (currentIndex < records.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setLastRecordAdded(true);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
    setLastRecordAdded(false);
  };

  const handleClear = () => {
    setAnswers({ A1: "", A2: "", A3: "" });
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(outputs, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "outputs.json");
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(outputs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "outputs.csv");
  };

  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / records.length) * 100;

  if (records.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Logo</div>
          <Link
            to="/import"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Import Dataset
          </Link>
          <Link
            to="/questions"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Questions Settings
          </Link>
        </header>
        <main className="flex-grow w-full max-w-4xl p-6 text-center">
          <h2 className="text-xl font-bold mb-4">No Records Available</h2>
          <Link
            to="/import"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Import Dataset
          </Link>
        </main>
      </div>
    );
  }

  const currentRecord = records[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <Link to="/import" className="bg-blue-500 text-white px-4 py-2 rounded">
          Import Dataset
        </Link>
        <Link
          to="/questions"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Questions Settings
        </Link>
      </header>

      <main className="flex-grow w-full max-w-4xl p-6">
        <h1 className="text-center text-3xl font-bold mb-6">
          Evaluation Rating
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Input"
            value={currentRecord.input}
            readOnly
            className="w-full p-4 border rounded-lg"
            rows="4"
          />
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex-1 mr-2">
            <h2 className="text-center font-semibold">Side A</h2>
            <textarea
              value={currentRecord.sideA}
              readOnly
              className="w-full p-4 border rounded-lg"
              rows="6"
            />
          </div>
          <div className="flex-1 ml-2">
            <h2 className="text-center font-semibold">Side B</h2>
            <textarea
              value={currentRecord.sideB}
              readOnly
              className="w-full p-4 border rounded-lg"
              rows="6"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-4">Form</h2>
          <label className="block mb-2 font-semibold">{questions.Q1}</label>
          <input
            type="text"
            placeholder={`Example: ${questions.exampleA1 || "Answer 1"}`}
            value={answers.A1}
            onChange={(e) => setAnswers({ ...answers, A1: e.target.value })}
            className="w-full p-4 border rounded-lg mb-4"
          />
          <label className="block mb-2 font-semibold">{questions.Q2}</label>
          <input
            type="text"
            placeholder={`Example: ${questions.exampleA2 || "Answer 2"}`}
            value={answers.A2}
            onChange={(e) => setAnswers({ ...answers, A2: e.target.value })}
            className="w-full p-4 border rounded-lg mb-4"
          />
          <label className="block mb-2 font-semibold">{questions.Q3}</label>
          <input
            type="text"
            placeholder={`Example: ${questions.exampleA3 || "Answer 3"}`}
            value={answers.A3}
            onChange={(e) => setAnswers({ ...answers, A3: e.target.value })}
            className="w-full p-4 border rounded-lg mb-4"
          />
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={handlePrevious}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextOrAddLast}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              lastRecordAdded
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={lastRecordAdded}
          >
            {currentIndex >= records.length - 1
              ? lastRecordAdded
                ? "No More Records"
                : "Add Last One"
              : "Next"}
          </button>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
          <button
            onClick={handleExportJSON}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export to JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export to CSV
          </button>
        </div>
      </main>

      <footer className="w-full bg-white text-center p-4 shadow">
        <div className="text-gray-500">
          © 2022 Noga Eval Tool. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default EvaluationPage;
