import { useState } from "react";

export default function AddSuspectForm({ onClose, onSubmit }) {
  const [suspectName, setSuspectName] = useState("");
  const [suspectRole, setSuspectRole] = useState("");
  const [suspectStatus, setSuspectStatus] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ suspectName, suspectRole, suspectStatus });
    } catch (err) {
      setError(err.message || "Failed to add suspect.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card">
        <h3>Add New Suspect</h3>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error" role="alert">{error}</p>}

          <label htmlFor="suspectName">Suspect Name</label>
          <input
            id="suspectName"
            type="text"
            required
            value={suspectName}
            onChange={(e) => setSuspectName(e.target.value)}
          />

          <label htmlFor="suspectRole">Role / Relation</label>
          <input
            id="suspectRole"
            type="text"
            placeholder="e.g. Lab Assistant, Security Guard"
            required
            value={suspectRole}
            onChange={(e) => setSuspectRole(e.target.value)}
          />

          <label htmlFor="suspectStatus">
            <input
              id="suspectStatus"
              type="checkbox"
              checked={suspectStatus}
              onChange={(e) => setSuspectStatus(e.target.checked)}
            />{" "}
            Active Suspect
          </label>

          <div className="actions" style={{ marginTop: "1rem" }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add Suspect"}
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