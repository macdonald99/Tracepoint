import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { apiPost } from "../api";
import SuspectList from "../components/SuspectList";
import AddSuspectForm from "../components/AddSuspectForm";

export default function SuspectsPage({ selectedSuspect, onSelectSuspect }) {
  const suspects = useFetch("/api/suspects");
  const cases = useFetch("/api/cases");
  const [showForm, setShowForm] = useState(false);

  if (suspects.loading || cases.loading) return <p>Loading suspects...</p>;
  if (suspects.error || cases.error) {
    return <p className="error">Could not load suspects. {suspects.error || cases.error}</p>;
  }

  if (!cases.data?.length) {
    return (
      <>
        <h1>Suspects</h1>
        <p>
          There is no case yet. <Link to="/case">Create the case</Link> first.
        </p>
      </>
    );
  }

  const caseId = cases.data[0].caseId;
  const caseSuspects = suspects.data.filter((s) => s.caseId === caseId);

  const handleAddSuspect = async (newSuspect) => {
    await apiPost("/api/suspects", { ...newSuspect, caseId });
    setShowForm(false);
    suspects.reload();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Suspects</h1>
        <button className="button" onClick={() => setShowForm(true)}>
          + Add Suspect
        </button>
      </div>

      <SuspectList
        suspects={caseSuspects}
        selectedSuspect={selectedSuspect}
        onSelectSuspect={onSelectSuspect}
      />

      {selectedSuspect && (
        <section className="detail" aria-live="polite">
          <h2>Selected suspect</h2>
          <p><strong>{selectedSuspect.suspectName}</strong></p>
          <p className="muted">{selectedSuspect.suspectRole}</p>
          <p>Status: {selectedSuspect.suspectStatus ? "Active" : "Cleared"}</p>
          <Link className="button" to="/investigation">Submit an investigation</Link>
        </section>
      )}

      {showForm && (
        <AddSuspectForm onClose={() => setShowForm(false)} onSubmit={handleAddSuspect} />
      )}
    </>
  );
}