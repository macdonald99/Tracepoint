using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Data;
using VenatorVeritatis.Models;

namespace VenatorVeritatis.Controllers
{
    public class CreateCaseDto
    {
        public string CaseName { get; set; } = "";
        public string CaseDescription { get; set; } = "";
        public bool CaseStatus { get; set; } = true;
    }

    [ApiController]
    [Route("api/cases")]
    public class CasesController : ControllerBase
    {
        private readonly VenatorVeritatisDbContext _context;

        public CasesController(VenatorVeritatisDbContext context)
        {
            _context = context;
        }

        // GET /api/cases  (newest case first, so it becomes the active case)
        [HttpGet]
        public async Task<IActionResult> GetCases()
        {
            var cases = await _context.Cases
                .OrderByDescending(c => c.CaseId)
                .Select(c => new
                {
                    c.CaseId,
                    c.CaseName,
                    c.CaseDescription,
                    c.CaseStatus
                })
                .ToListAsync();

            return Ok(cases);
        }

        // GET /api/cases/{id}
        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> GetCase(int id)
        {
            var result = await _context.Cases
                .Where(c => c.CaseId == id)
                .Select(c => new
                {
                    c.CaseId,
                    c.CaseName,
                    c.CaseDescription,
                    c.CaseStatus,
                    Suspects = c.Suspects.Select(s => new
                    {
                        s.SuspectId,
                        s.SuspectName,
                        s.SuspectRole,
                        s.SuspectStatus
                    }),
                    Evidence = c.Evidence.Select(e => new
                    {
                        e.EvidenceId,
                        e.EvidenceName,
                        e.EvidenceDescription,
                        e.EvidenceState
                    }),
                    Investigations = c.Investigations.Select(i => new
                    {
                        i.InvestigationId,
                        i.InvestigationName,
                        i.DateStarted
                    })
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST /api/cases
        [HttpPost]
        public async Task<IActionResult> CreateCase(CreateCaseDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CaseName))
            {
                return BadRequest("Case name is required.");
            }

            var newCase = new Case
            {
                CaseName = dto.CaseName,
                CaseDescription = dto.CaseDescription,
                CaseStatus = dto.CaseStatus
            };

            _context.Cases.Add(newCase);
            await _context.SaveChangesAsync();

            return Created($"/api/cases/{newCase.CaseId}", new
            {
                newCase.CaseId,
                newCase.CaseName,
                newCase.CaseDescription,
                newCase.CaseStatus
            });
        }
    }
}