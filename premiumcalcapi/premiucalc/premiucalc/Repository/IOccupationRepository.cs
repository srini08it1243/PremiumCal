using PremiumApi.Models;

public interface IOccupationRepository
{
    Task<List<Occupation>> GetAll();
    Task<Occupation> GetById(int id);
}
