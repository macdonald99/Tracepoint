import { useState } from "react";
import EvidenceCard from "./EvidenceCard";

export default function EvidenceList({ evidence }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  if (!evidence.length) {
    return <p className="muted">No evidence added to this case yet.</p>;
  }

  return (
    <>
      <div className="grid">
        {evidence.map((item) => (
          <EvidenceCard
            key={item.evidenceId}
            evidence={item}
            isSelected={selectedEvidence?.evidenceId === item.evidenceId}
            onExamine={setSelectedEvidence}
          />
        ))}
      </div>

      {selectedEvidence && (
        <section className="detail" aria-live="polite" style={{ marginTop: "1rem" }}>
          <h2>{selectedEvidence.evidenceName}</h2>
          <p>{selectedEvidence.evidenceDescription}</p>
          <p className="muted">Condition: {selectedEvidence.evidenceState}</p>
          <button className="button secondary" onClick={() => setSelectedEvidence(null)}>
            Close Examination
          </button>
        </section>
      )}
    </>
  );
}