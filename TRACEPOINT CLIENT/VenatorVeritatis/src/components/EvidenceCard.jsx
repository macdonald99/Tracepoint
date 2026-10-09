export default function EvidenceCard({ evidence, isSelected, onExamine }) {
  return (
    <article className={`card ${isSelected ? "selected" : ""}`}>
      <h3>{evidence.evidenceName}</h3>
      <p className="muted">Condition: {evidence.evidenceState}</p>
      <button className="button" onClick={() => onExamine(evidence)}>
        Examine Evidence
      </button>
    </article>
  );
}