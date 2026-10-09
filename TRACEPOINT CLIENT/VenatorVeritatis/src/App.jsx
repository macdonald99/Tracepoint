import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import CasePage from "./pages/CasePage";
import SuspectsPage from "./pages/SuspectsPage";
import EvidencePage from "./pages/EvidencePage";
import InvestigationPage from "./pages/InvestigationPage";

export default function App() {
  
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  return (
    <>
      <Navigation />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case" element={<CasePage />} />
          <Route
            path="/suspects"
            element={
              <SuspectsPage
                selectedSuspect={selectedSuspect}
                onSelectSuspect={setSelectedSuspect}
              />
            }
          />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route
            path="/investigation"
            element={
              <InvestigationPage
                selectedSuspect={selectedSuspect}
                onSelectSuspect={setSelectedSuspect}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}