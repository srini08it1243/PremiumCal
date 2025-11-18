using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/premium")]
public class PremiumController : ControllerBase
{
    private readonly IOccupationRepository _repo;
    private readonly IPremiumService _service;

    public PremiumController(IOccupationRepository repo, IPremiumService service)
    {
        _repo = repo;
        _service = service;
    }

    [HttpGet("occupations")]
    public async Task<IActionResult> GetOccupations() => Ok(await _repo.GetAll());

    [HttpPost("calculate")]
    public async Task<IActionResult> CalculatePremium(PremiumRequest request)
    {
        double premium = await _service.CalculatePremium(request);
        return Ok(new { MonthlyPremium = premium });
    }
}
