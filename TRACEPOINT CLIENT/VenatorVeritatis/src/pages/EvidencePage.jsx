import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { apiPost } from "../api";
import EvidenceList from "../components/EvidenceList";
import AddEvidenceForm from "../components/AddEvidenceForm";

export default function EvidencePage() {
  const evidence = useFetch("/api/evidence");
  const cases = useFetch("/api/cases");
  const [showForm, setShowForm] = useState(false);

  if (evidence.loading || cases.loading) return <p>Loading evidence...</p>;
  if (evidence.error || cases.error) {
    return <p className="error">Could not load evidence. {evidence.error || cases.error}</p>;
  }

  if (!cases.data?.length) {
    return (
      <>
        <h1>Evidence</h1>
        <p>
          There is no case yet. <Link to="/case">Create the case</Link> first.
        </p>
      </>
    );
  }

  const caseId = cases.data[0].caseId;
  const caseEvidence = evidence.data.filter((e) => e.caseId === caseId);

  const handleAddEvidence = async (newEvidence) => {
    await apiPost("/api/evidence", { ...newEvidence, caseId });
    setShowForm(false);
    evidence.reload();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Evidence</h1>
        <button className="button" onClick={() => setShowForm(true)}>
          + Add Evidence
        </button>
      </div>

      <EvidenceList evidence={caseEvidence} />

      {showForm && (
        <AddEvidenceForm onClose={() => setShowForm(false)} onSubmit={handleAddEvidence} />
      )}
    </>
  );
}