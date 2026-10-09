using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Data;
using VenatorVeritatis.Models;

namespace VenatorVeritatis.Controllers
{
    public class CreateEvidenceDto
    {
        public string EvidenceName { get; set; } = "";
        public string EvidenceDescription { get; set; } = "";
        public string EvidenceState { get; set; } = "";
        public int CaseId { get; set; }
    }

    [ApiController]
    [Route("api/evidence")]
    public class EvidenceController : ControllerBase
    {
        private readonly VenatorVeritatisDbContext _context;

        public EvidenceController(VenatorVeritatisDbContext context)
        {
            _context = context;
        }

        // GET /api/evidence
        [HttpGet]
        public async Task<IActionResult> GetEvidence()
        {
            var evidence = await _context.Evidence
                .Select(e => new
                {
                    e.EvidenceId,
                    e.EvidenceName,
                    e.EvidenceDescription,
                    e.EvidenceState,
                    e.CaseId
                })
                .ToListAsync();

            return Ok(evidence);
        }

        // GET /api/evidence/{id}
        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> GetEvidenceById(int id)
        {
            var result = await _context.Evidence
                .Where(e => e.EvidenceId == id)
                .Select(e => new
                {
                    e.EvidenceId,
                    e.EvidenceName,
                    e.EvidenceDescription,
                    e.EvidenceState,
                    e.CaseId,
                    CaseName = e.Case.CaseName
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST /api/evidence
        [HttpPost]
        public async Task<IActionResult> CreateEvidence(CreateEvidenceDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.EvidenceName))
            {
                return BadRequest("Evidence name is required.");
            }

            var caseExists = await _context.Cases.AnyAsync(c => c.CaseId == dto.CaseId);
            if (!caseExists)
            {
                return BadRequest($"Case {dto.CaseId} does not exist.");
            }

            var evidence = new Evidence
            {
                EvidenceName = dto.EvidenceName,
                EvidenceDescription = dto.EvidenceDescription,
                EvidenceState = dto.EvidenceState,
                CaseId = dto.CaseId
            };

            _context.Evidence.Add(evidence);
            await _context.SaveChangesAsync();

            return Created($"/api/evidence/{evidence.EvidenceId}", new
            {
                evidence.EvidenceId,
                evidence.EvidenceName,
                evidence.EvidenceDescription,
                evidence.EvidenceState,
                evidence.CaseId
            });
        }
    }
}