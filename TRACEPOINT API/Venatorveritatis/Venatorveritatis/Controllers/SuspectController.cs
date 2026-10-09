using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Data;
using VenatorVeritatis.Models;

namespace VenatorVeritatis.Controllers
{
    public class CreateSuspectDto
    {
        public string SuspectName { get; set; } = "";
        public string SuspectRole { get; set; } = "";
        public bool SuspectStatus { get; set; } = true;
        public int CaseId { get; set; }
    }

    [ApiController]
    [Route("api/suspects")]
    public class SuspectsController : ControllerBase
    {
        private readonly VenatorVeritatisDbContext _context;

        public SuspectsController(VenatorVeritatisDbContext context)
        {
            _context = context;
        }

        // GET /api/suspects
        [HttpGet]
        public async Task<IActionResult> GetSuspects()
        {
            var suspects = await _context.Suspects
                .Select(s => new
                {
                    s.SuspectId,
                    s.SuspectName,
                    s.SuspectRole,
                    s.SuspectStatus,
                    s.CaseId
                })
                .ToListAsync();

            return Ok(suspects);
        }

        // GET /api/suspects/{id}
        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> GetSuspect(int id)
        {
            var result = await _context.Suspects
                .Where(s => s.SuspectId == id)
                .Select(s => new
                {
                    s.SuspectId,
                    s.SuspectName,
                    s.SuspectRole,
                    s.SuspectStatus,
                    s.CaseId,
                    CaseName = s.Case.CaseName,
                    Investigations = s.Investigations.Select(i => new
                    {
                        i.InvestigationId,
                        i.InvestigationName
                    })
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST /api/suspects
        [HttpPost]
        public async Task<IActionResult> CreateSuspect(CreateSuspectDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.SuspectName))
            {
                return BadRequest("Suspect name is required.");
            }

            var caseExists = await _context.Cases.AnyAsync(c => c.CaseId == dto.CaseId);
            if (!caseExists)
            {
                return BadRequest($"Case {dto.CaseId} does not exist.");
            }

            var suspect = new Suspect
            {
                SuspectName = dto.SuspectName,
                SuspectRole = dto.SuspectRole,
                SuspectStatus = dto.SuspectStatus,
                CaseId = dto.CaseId
            };

            _context.Suspects.Add(suspect);
            await _context.SaveChangesAsync();

            return Created($"/api/suspects/{suspect.SuspectId}", new
            {
                suspect.SuspectId,
                suspect.SuspectName,
                suspect.SuspectRole,
                suspect.SuspectStatus,
                suspect.CaseId
            });
        }
    }
}