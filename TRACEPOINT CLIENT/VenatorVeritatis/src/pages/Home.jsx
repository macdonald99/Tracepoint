import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="brand">TracePoint Investigations</p>
      <h1>YOUR LEADING INVESTIGATOR</h1>
      <p className="lead">ENTER YOUR INVESTIGATION</p>
      <p className="lead">
        TracePoint is a leading investigation management system that helps you manage your cases, suspects, and evidence efficiently. Start your investigation today and uncover the truth.
      </p>
      <Link className="button" to="/case">Start Investigation</Link>
    </section>
  );
}