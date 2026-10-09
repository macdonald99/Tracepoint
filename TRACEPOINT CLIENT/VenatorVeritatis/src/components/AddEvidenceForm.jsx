import { useState } from "react";

export default function AddEvidenceForm({ onClose, onSubmit }) {
  const [evidenceName, setEvidenceName] = useState("");
  const [evidenceDescription, setEvidenceDescription] = useState("");
  const [evidenceState, setEvidenceState] = useState("Intact");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ evidenceName, evidenceDescription, evidenceState });
    } catch (err) {
      setError(err.message || "Failed to add evidence.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card">
        <h3>Add New Evidence</h3>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error" role="alert">{error}</p>}

          <label htmlFor="evidenceName">Evidence Name</label>
          <input
            id="evidenceName"
            type="text"
            required
            value={evidenceName}
            onChange={(e) => setEvidenceName(e.target.value)}
          />

          <label htmlFor="evidenceDescription">Description</label>
          <textarea
            id="evidenceDescription"
            rows="3"
            required
            value={evidenceDescription}
            onChange={(e) => setEvidenceDescription(e.target.value)}
          />

          <label htmlFor="evidenceState">Condition / State</label>
          <input
            id="evidenceState"
            type="text"
            placeholder="e.g. Damaged, Analyzed, Intact"
            required
            value={evidenceState}
            onChange={(e) => setEvidenceState(e.target.value)}
          />

          <div className="actions" style={{ marginTop: "1rem" }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add Evidence"}
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