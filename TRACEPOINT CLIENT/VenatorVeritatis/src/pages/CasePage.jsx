import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { apiPost } from "../api";
import CaseCard from "../components/CaseCard";
import AddCaseForm from "../components/AddCaseForm";

export default function CasePage() {
  const { data, loading, error, reload } = useFetch("/api/cases");
  const [showForm, setShowForm] = useState(false);

  if (loading) return <p>Loading case...</p>;
  if (error) return <p className="error">Could not load the case. {error}</p>;

  const handleAddCase = async (newCase) => {
    await apiPost("/api/cases", newCase);
    setShowForm(false);
    reload();
  };

  const hasCase = data?.length > 0;

  return (
    <>
      {hasCase ? (
        <CaseCard caseItem={data[0]} />
      ) : (
        <>
          <h1>No case yet</h1>
          <p className="muted">Create the case to begin the investigation.</p>
        </>
      )}

      <div className="actions">
        <button className="button" onClick={() => setShowForm(true)}>
          {hasCase ? "Add New Case" : "Create Case"}
        </button>
      </div>

      {showForm && (
        <AddCaseForm onClose={() => setShowForm(false)} onSubmit={handleAddCase} />
      )}
    </>
  );
}