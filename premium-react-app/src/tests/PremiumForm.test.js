import { render, fireEvent, screen } from "@testing-library/react";
import PremiumForm from "../components/PremiumForm";
import { getOccupations, calculatePremium } from "../api/premiumApi";

jest.mock("../api/premiumApi");

test("loads occupations and calculates premium", async () => {
  getOccupations.mockResolvedValue([
    { id: 1, name: "Doctor" },
    { id: 2, name: "Engineer" }
  ]);

  calculatePremium.mockResolvedValue({
    monthlyPremium: 200
  });

  render(<PremiumForm />);

  // wait for occupations
  const occupationSelect = await screen.findByTestId("select-occupation");
  fireEvent.change(occupationSelect, { target: { value: "1" } });

  fireEvent.change(screen.getByTestId("input-name"), {
    target: { value: "John" }
  });

  fireEvent.change(screen.getByTestId("input-age"), {
    target: { value: "30" }
  });

  fireEvent.change(screen.getByTestId("input-sum"), {
    target: { value: "500000" }
  });

  fireEvent.click(screen.getByTestId("btn-calc"));

  const result = await screen.findByTestId("premium-result");
  expect(result.textContent).toBe("Monthly Premium: 200");
});
