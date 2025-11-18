using Microsoft.AspNetCore.Mvc;
using Moq;
using PremiumApi.Models;
using Xunit;

public class PremiumControllerTests
{
    [Fact]
    public async Task CalculatePremium_ReturnsCorrectPremium()
    {
        // Mock repository
        var mockRepo = new Mock<IOccupationRepository>();
        mockRepo.Setup(r => r.GetById(1)).ReturnsAsync(
            new Occupation
            {
                Id = 1,
                Name = "Engineer",
                Rating = new Rating { Factor = 1.25 }
            });

        // Mock service
        var mockService = new Mock<IPremiumService>();
        mockService.Setup(s => s.CalculatePremium(It.IsAny<PremiumRequest>()))
                   .ReturnsAsync(225000.00);

        // Pass BOTH to controller
        var controller = new PremiumController(mockRepo.Object, mockService.Object);

        var request = new PremiumRequest
        {
            Age = 30,
            OccupationId = 1,
            SumInsured = 500000
        };

        // Act
        var result = await controller.CalculatePremium(request) as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        dynamic data = result.Value!;
        Assert.Equal(225000.00, data.MonthlyPremium);
    }
}
