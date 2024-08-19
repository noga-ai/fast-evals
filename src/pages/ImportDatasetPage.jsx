import React from "react";
import Papa from "papaparse";
import { useRecords } from "../context/RecordsContext";
import { useNavigate } from "react-router-dom";

function ImportDatasetPage() {
  const { setRecords } = useRecords();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (file.type === "application/json") {
        const jsonData = JSON.parse(content);
        setRecords(jsonData);
      } else {
        Papa.parse(content, {
          header: true,
          complete: (results) => {
            setRecords(results.data);
          },
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Import Dataset</h2>
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default ImportDatasetPage;
