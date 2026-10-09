export default function SuspectCard({ suspect, isSelected, onSelect }) {
  return (
    <article className={`card ${isSelected ? "selected" : ""}`}>
      <h3>{suspect.suspectName}</h3>
      <p className="muted">{suspect.suspectRole}</p>
      <p>Status: {suspect.suspectStatus ? "Active" : "Cleared"}</p>
      <button
        className="button"
        onClick={() => onSelect(suspect)}
        aria-pressed={isSelected}
      >
        {isSelected ? "Selected" : "Select Suspect"}
      </button>
    </article>
  );
}