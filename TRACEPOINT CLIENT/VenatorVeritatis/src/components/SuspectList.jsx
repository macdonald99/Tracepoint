import SuspectCard from "./SuspectCard";

export default function SuspectList({ suspects, selectedSuspect, onSelectSuspect }) {
  if (!suspects.length) {
    return <p className="muted">No suspects added to this case yet.</p>;
  }

  return (
    <div className="grid">
      {suspects.map((suspect) => (
        <SuspectCard
          key={suspect.suspectId}
          suspect={suspect}
          isSelected={selectedSuspect?.suspectId === suspect.suspectId}
          onSelect={onSelectSuspect}
        />
      ))}
    </div>
  );
}