import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EvaluationPage from "./pages/EvaluationPage";
import QuestionSettingsModal from "./pages/QuestionSettingsModal";
import ImportDatasetPage from "./pages/ImportDatasetPage";
import { RecordsProvider } from "./context/RecordsContext";

function App() {
  return (
    <RecordsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EvaluationPage />} />
          <Route path="/questions" element={<QuestionSettingsModal />} />
          <Route path="/import" element={<ImportDatasetPage />} />
        </Routes>
      </Router>
    </RecordsProvider>
  );
}

export default App;
