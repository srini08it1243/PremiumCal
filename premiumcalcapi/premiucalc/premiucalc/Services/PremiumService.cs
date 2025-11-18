public class PremiumService : IPremiumService
{
    private readonly IOccupationRepository _repo;
    public PremiumService(IOccupationRepository repo) => _repo = repo;

    public async Task<double> CalculatePremium(PremiumRequest request)
    {
        var occupation = await _repo.GetById(request.OccupationId);
        if (occupation == null) throw new Exception("Invalid Occupation");

        return Math.Round((request.SumInsured * occupation.Rating.Factor * request.Age) / 1000 * 12, 2);
    }
}