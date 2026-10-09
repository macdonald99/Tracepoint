import { useState } from "react";
import { apiPost } from "../api";

export default function InvestigationForm({
  suspects,
  caseItem,
  selectedSuspect,
  onSelectSuspect,
  onSubmitted,
}) {
  const [conclusion, setConclusion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSuspectChange = (event) => {
    const chosen = suspects.find((s) => s.suspectId === Number(event.target.value));
    onSelectSuspect(chosen ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSuspect || !conclusion.trim()) {
      setError("Choose a suspect and write your conclusion before submitting.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await apiPost("/api/investigations", {
        investigationName: `Investigation: ${selectedSuspect.suspectName}`,
        investigationDescription: `Investigation into ${caseItem.caseName}`,
        investigationLocation: "Research laboratory",
        conclusion: conclusion.trim(),
        dateStarted: new Date().toISOString(),
        caseId: caseItem.caseId,
        suspectIds: [selectedSuspect.suspectId],
      });
      setSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      setError(`Could not submit the investigation. ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="detail success" role="status">
        <h2>Investigation Submitted Successfully</h2>
        <p>Your investigation report has been saved to the database.</p>
        <button
          className="button secondary"
          onClick={() => {
            setSubmitted(false);
            setConclusion("");
          }}
        >
          Submit another
        </button>
      </section>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="suspect">Suspect</label>
      <select
        id="suspect"
        value={selectedSuspect?.suspectId ?? ""}
        onChange={handleSuspectChange}
      >
        <option value="">Select a suspect</option>
        {suspects.map((s) => (
          <option key={s.suspectId} value={s.suspectId}>
            {s.suspectName} ({s.suspectRole})
          </option>
        ))}
      </select>

      <label htmlFor="conclusion">Conclusion</label>
      <textarea
        id="conclusion"
        rows="6"
        value={conclusion}
        onChange={(e) => setConclusion(e.target.value)}
        placeholder="Explain why this suspect is the primary suspect..."
      />

      {error && <p className="error" role="alert">{error}</p>}

      <button className="button" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Investigation"}
      </button>
    </form>
  );
}