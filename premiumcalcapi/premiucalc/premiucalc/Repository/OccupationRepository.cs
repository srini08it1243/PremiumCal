using Microsoft.EntityFrameworkCore;
using PremiumApi.Data;
using PremiumApi.Models;

public class OccupationRepository : IOccupationRepository
{
    private readonly AppDbContext _context;
    public OccupationRepository(AppDbContext context) => _context = context;

    public async Task<List<Occupation>> GetAll() =>
        await _context.Occupations.Include(o => o.Rating).ToListAsync();

    public async Task<Occupation> GetById(int id) =>
        await _context.Occupations.Include(o => o.Rating)
                                   .FirstOrDefaultAsync(o => o.Id == id);
}
