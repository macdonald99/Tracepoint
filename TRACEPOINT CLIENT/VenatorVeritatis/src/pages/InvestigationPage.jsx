import { useState, useEffect } from "react";
import CaseCard from "../components/CaseCard";
import SuspectList from "../components/SuspectList";
import EvidenceList from "../components/EvidenceList";
import InvestigationForm from "../components/InvestigationForm";
import AddCaseForm from "../components/AddCaseForm";
import AddSuspectForm from "../components/AddSuspectForm";
import AddEvidenceForm from "../components/AddEvidenceForm";
import { apiGet, apiPost } from "../api";

export default function InvestigationPage() {
  const [caseItem, setCaseItem] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [savedInvestigations, setSavedInvestigations] = useState([]);

  const [selectedSuspect, setSelectedSuspect] = useState(null);


  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showSuspectForm, setShowSuspectForm] = useState(false);
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCaseData();
  }, []);

  const loadCaseData = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const cases = await apiGet("/api/cases");
      const activeCase = cases?.[0] || null;
      setCaseItem(activeCase);

      if (activeCase) {
        
        const [allSuspects, allEvidence, allInvestigations] = await Promise.all([
          apiGet("/api/suspects"),
          apiGet("/api/evidence"),
          apiGet("/api/investigations/with-suspects"),
        ]);

        
        setSuspects(allSuspects.filter((s) => s.caseId === activeCase.caseId) || []);
        setEvidenceList(allEvidence.filter((e) => e.caseId === activeCase.caseId) || []);
        setSavedInvestigations(allInvestigations || []);
      }
    } catch (err) {
      setError(`Error loading case data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleAddCase = async (newCaseData) => {
    const created = await apiPost("/api/cases", newCaseData);
    setCaseItem(created);
    setSuspects([]);
    setEvidenceList([]);
    setSavedInvestigations([]);
    setShowCaseForm(false);
  };

  
  const handleAddSuspect = async (newSuspectData) => {
    const created = await apiPost("/api/suspects", {
      ...newSuspectData,
      caseId: caseItem.caseId,
    });
    setSuspects((prev) => [...prev, created]);
    setShowSuspectForm(false);
  };

  
  const handleAddEvidence = async (newEvidenceData) => {
    const created = await apiPost("/api/evidence", {
      ...newEvidenceData,
      caseId: caseItem.caseId,
    });
    setEvidenceList((prev) => [...prev, created]);
    setShowEvidenceForm(false);
  };

  
  const handleInvestigationSubmitted = async () => {
    try {
      const investigationsData = await apiGet("/api/investigations/with-suspects");
      setSavedInvestigations(investigationsData || []);
    } catch (err) {
      console.error("Could not refresh investigations:", err);
    }
  };

  if (loading) return <div className="loader">Loading investigation case...</div>;

  return (
    <div className="investigation-container" style={{ padding: "1.5rem" }}>
      {error && <p className="error" role="alert">{error}</p>}

      {/* 1. CASE SECTION (Display & Add Case) */}
      <section className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Current Case</h2>
          <button className="button" onClick={() => setShowCaseForm(true)}>
            {caseItem ? "Switch / Add New Case" : "Add Case"}
          </button>
        </div>

        {caseItem ? (
          <CaseCard caseItem={caseItem} />
        ) : (
          <p className="muted">No active case created yet. Click "Add Case" to begin.</p>
        )}
      </section>

      {caseItem && (
        <>
          <hr style={{ margin: "2rem 0" }} />

          {/* 2. SUSPECTS SECTION (Add, Display & Select Suspect) */}
          <section className="section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Suspects</h2>
              <button className="button secondary" onClick={() => setShowSuspectForm(true)}>
                + Add Suspect
              </button>
            </div>
            <SuspectList
              suspects={suspects}
              selectedSuspect={selectedSuspect}
              onSelectSuspect={setSelectedSuspect}
            />
          </section>

          <hr style={{ margin: "2rem 0" }} />

          {/* 3. EVIDENCE SECTION (Add & Examine Evidence) */}
          <section className="section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Evidence</h2>
              <button className="button secondary" onClick={() => setShowEvidenceForm(true)}>
                + Add Evidence
              </button>
            </div>
            <EvidenceList evidence={evidenceList} />
          </section>

          <hr style={{ margin: "2rem 0" }} />

          {/* 4. SUBMIT INVESTIGATION REPORT */}
          <section className="section">
            <h2>File Investigation Report</h2>
            <InvestigationForm
              suspects={suspects}
              caseItem={caseItem}
              selectedSuspect={selectedSuspect}
              onSelectSuspect={setSelectedSuspect}
              onSubmitted={handleInvestigationSubmitted}
            />
          </section>

          <hr style={{ margin: "2rem 0" }} />

          {/* 5. DISPLAY SAVED INVESTIGATIONS FROM DB */}
          <section className="section">
            <h2>Saved Investigations</h2>
            {savedInvestigations.length === 0 ? (
              <p className="muted">No saved investigation reports found for this case.</p>
            ) : (
              <div className="grid">
                {savedInvestigations.map((inv, index) => (
                  <article key={inv.investigationId || index} className="card">
                    <h3>{inv.suspectName ? `Suspect: ${inv.suspectName}` : "Investigation Report"}</h3>
                    <p className="muted">
                      Started: {new Date(inv.dateStarted).toLocaleDateString()}
                    </p>
                    <p><strong>Conclusion:</strong> {inv.conclusion}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* --- FORM MODALS --- */}
      {showCaseForm && (
        <AddCaseForm
          onClose={() => setShowCaseForm(false)}
          onSubmit={handleAddCase}
        />
      )}

      {showSuspectForm && (
        <AddSuspectForm
          onClose={() => setShowSuspectForm(false)}
          onSubmit={handleAddSuspect}
        />
      )}

      {showEvidenceForm && (
        <AddEvidenceForm
          onClose={() => setShowEvidenceForm(false)}
          onSubmit={handleAddEvidence}
        />
      )}
    </div>
  );
}