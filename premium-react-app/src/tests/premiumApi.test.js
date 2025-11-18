import axios from "axios";
import { getOccupations, calculatePremium } from "../api/premiumApi";

jest.mock("axios");

test("getOccupations returns data", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, name: "Doctor" }] });
  const data = await getOccupations();
  expect(data.length).toBe(1);
});

test("calculatePremium returns monthly premium", async () => {
  axios.post.mockResolvedValue({ data: { MonthlyPremium: 150 } });
  const payload = { Name: "John", Age: 30, OccupationId: 1, SumInsured: 500000 };
  const result = await calculatePremium(payload);
  expect(result.MonthlyPremium).toBe(150);
});
