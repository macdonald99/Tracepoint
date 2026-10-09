using Microsoft.Identity.Client;
using System.Collections.Generic;

namespace VenatorVeritatis.Models
{
    public class Case
    {
        public int CaseId { get; set; }
        public string CaseName { get; set; }
        public string CaseDescription { get; set; }
        public bool CaseStatus { get; set; }

        public ICollection<Suspect> Suspects { get; set; }
        public ICollection<Evidence> Evidence { get; set; }
        public ICollection<Investigation> Investigations { get; set; }

    }

    public class Suspect
    {
        public int SuspectId { get; set; }
        public string SuspectName { get; set; }
        public string SuspectRole { get; set; }
        public bool SuspectStatus { get; set; }


        public int CaseId { get; set; }
        public Case Case { get; set; }

        public ICollection<Investigation> Investigations { get; set; }
    }

    public class Evidence
    {
        public int EvidenceId { get; set; }
        public string EvidenceName { get; set; }
        public string EvidenceDescription { get; set; }
        public string EvidenceState { get; set; }

        public int CaseId { get; set; }
        public Case Case { get; set; }
    }

    public class Investigation
    {
        public int InvestigationId { get; set; }
        public string InvestigationName { get; set; }
        public string InvestigationDescription { get; set; }
        public string InvestigationLocation { get; set; }
        public string Conclusion { get; set; }
        public DateTime DateStarted { get; set; }

        public int CaseId { get; set; }
        public Case Case { get; set; }

        public ICollection<Suspect> Suspects { get; set; }

    }

    public class InvestigationSuspect
    {
        public int InvestigationId { get; set; }
        public Investigation Investigation { get; set; }
        public int SuspectId { get; set; }
        public Suspect Suspect { get; set; }
    }

    public class InvestigationSuspectResult
    {
        public int InvestigationId { get; set; }
        public string SuspectName { get; set; }
        public string Conclusion { get; set; }
        public DateTime DateStarted { get; set; }
    }
}
