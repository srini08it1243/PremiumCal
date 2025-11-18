

public interface IPremiumService
{
    Task<double> CalculatePremium(PremiumRequest request);
}
