namespace premiucalc.DTOs
{
    public class MemberRequestDto
    {
        public string Name { get; set; }
        public int AgeNextBirthday { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int OccupationId { get; set; }
        public decimal DeathSumInsured { get; set; }
    }
}
