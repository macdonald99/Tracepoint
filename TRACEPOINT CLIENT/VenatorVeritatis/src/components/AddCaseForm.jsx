import { useState } from "react";

export default function AddCaseForm({ onClose, onSubmit }) {
  const [caseName, setCaseName] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [caseStatus, setCaseStatus] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ caseName, caseDescription, caseStatus });
    } catch (err) {
      setError(err.message || "Failed to save case.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card">
        <h3>Create New Case</h3>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error" role="alert">{error}</p>}

          <label htmlFor="caseName">Case Name</label>
          <input
            id="caseName"
            type="text"
            required
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
          />

          <label htmlFor="caseDescription">Description</label>
          <textarea
            id="caseDescription"
            rows="4"
            required
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
          />

          <label htmlFor="caseStatus">
            <input
              id="caseStatus"
              type="checkbox"
              checked={caseStatus}
              onChange={(e) => setCaseStatus(e.target.checked)}
            />{" "}
            Case is Open
          </label>

          <div className="actions" style={{ marginTop: "1rem" }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save Case"}
            </button>
            <button className="button secondary" type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}