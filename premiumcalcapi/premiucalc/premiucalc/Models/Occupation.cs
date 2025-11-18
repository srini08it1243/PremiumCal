namespace PremiumApi.Models
{
    public class Occupation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RatingId { get; set; }
        public Rating Rating { get; set; }
    }
}
