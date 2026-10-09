using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Data;
using VenatorVeritatis.Models;

namespace VenatorVeritatis.Controllers
{
    public class CreateInvestigationDto
    {
        public string InvestigationName { get; set; } = "";
        public string InvestigationDescription { get; set; } = "";
        public string InvestigationLocation { get; set; } = "";
        public string Conclusion { get; set; } = "";
        public DateTime DateStarted { get; set; }
        public int CaseId { get; set; }
        public List<int> SuspectIds { get; set; } = new();
    }

    // Result shape for the Dapper query
    public class InvestigationSuspectResult
    {
        public int InvestigationId { get; set; }
        public string SuspectName { get; set; }
        public string Conclusion { get; set; }
        public DateTime DateStarted { get; set; }
    }

    [ApiController]
    [Route("api/investigations")]
    public class InvestigationsController : ControllerBase
    {
        private readonly VenatorVeritatisDbContext _context;

        public InvestigationsController(VenatorVeritatisDbContext context)
        {
            _context = context;
        }

        // POST /api/investigations  (Entity Framework Core)
        [HttpPost]
        public async Task<IActionResult> CreateInvestigation(CreateInvestigationDto dto)
        {
            var caseExists = await _context.Cases.AnyAsync(c => c.CaseId == dto.CaseId);
            if (!caseExists)
            {
                return BadRequest($"Case {dto.CaseId} does not exist.");
            }

            var suspectIds = dto.SuspectIds.Distinct().ToList();
            if (suspectIds.Count == 0)
            {
                return BadRequest("Select at least one suspect.");
            }

            var suspects = await _context.Suspects
                .Where(s => suspectIds.Contains(s.SuspectId))
                .ToListAsync();

            if (suspects.Count != suspectIds.Count)
            {
                return BadRequest("One or more suspect IDs do not exist.");
            }

            var investigation = new Investigation
            {
                InvestigationName = dto.InvestigationName,
                InvestigationDescription = dto.InvestigationDescription,
                InvestigationLocation = dto.InvestigationLocation,
                Conclusion = dto.Conclusion,
                DateStarted = dto.DateStarted,
                CaseId = dto.CaseId,
                Suspects = suspects
            };

            _context.Investigations.Add(investigation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetInvestigation),
                new { id = investigation.InvestigationId },
                new { investigation.InvestigationId, investigation.InvestigationName });
        }

        // GET /api/investigations/{id}
        [HttpGet("{id:int:min(1)}")]
        public async Task<IActionResult> GetInvestigation(int id)
        {
            var result = await _context.Investigations
                .Where(i => i.InvestigationId == id)
                .Select(i => new
                {
                    i.InvestigationId,
                    i.InvestigationName,
                    i.InvestigationDescription,
                    i.InvestigationLocation,
                    i.Conclusion,
                    i.DateStarted,
                    i.CaseId,
                    SuspectNames = i.Suspects.Select(s => s.SuspectName)
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // GET /api/investigations/with-suspects  (Dapper)
        [HttpGet("with-suspects")]
        public async Task<IActionResult> GetInvestigationsWithSuspects()
        {
            const string sql = @"
                SELECT i.InvestigationId,
                       s.SuspectName,
                       i.Conclusion,
                       i.DateStarted
                FROM Investigations i
                INNER JOIN InvestigationSuspects isu ON i.InvestigationId = isu.InvestigationId
                INNER JOIN Suspects s ON isu.SuspectId = s.SuspectId
                ORDER BY i.InvestigationId DESC, s.SuspectName";

            var connection = _context.Database.GetDbConnection();
            var results = await connection.QueryAsync<InvestigationSuspectResult>(sql);

            return Ok(results);
        }
    }
}