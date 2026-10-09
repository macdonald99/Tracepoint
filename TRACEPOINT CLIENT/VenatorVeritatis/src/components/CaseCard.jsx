import { Link } from "react-router-dom";

export default function CaseCard({ caseItem }) {
  return (
    <article className="case-card">
      <h1>{caseItem.caseName}</h1>
      <p className={`status ${caseItem.caseStatus ? "open" : "closed"}`}>
        Status: {caseItem.caseStatus ? "OPEN" : "CLOSED"}
      </p>
      <p className="lead">{caseItem.caseDescription}</p>
      <div className="actions">
        <Link className="button" to="/suspects">View Suspects</Link>
        <Link className="button secondary" to="/evidence">View Evidence</Link>
      </div>
    </article>
  );
}