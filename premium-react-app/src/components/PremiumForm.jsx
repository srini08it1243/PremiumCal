import React, { useEffect, useState } from "react";
import { getOccupations, calculatePremium } from "../api/premiumApi";

export default function PremiumForm() {
  const [occupations, setOccupations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    occupationId: "",
    sumInsured: ""
  });
  const [premium, setPremium] = useState(null);
  const [error, setError] = useState("");

  // Fetch occupations when component mounts
  useEffect(() => {
    getOccupations()
      .then((data) => setOccupations(data))
      .catch((err) => console.error("Error fetching occupations:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle calculate button click
  const handleCalculate = async () => {
    setError("");
    setPremium(null);

    // Basic validation
    if (!form.name || !form.age || !form.occupationId || !form.sumInsured) {
      setError("All fields are required.");
      return;
    }

    try {
      const data = await calculatePremium({
        Name: form.name,
        Age: Number(form.age),
        OccupationId: Number(form.occupationId),
        SumInsured: Number(form.sumInsured)
      });

      console.log("API Response:", data);

      // Safe assignment
      setPremium(data.monthlyPremium);
    } catch (err) {
      console.error("Error calculating premium:", err);
      setError("Failed to calculate premium. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Premium Calculator</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
        <input
          name="age"
          type="number"
          placeholder="Age Next Birthday"
          value={form.age}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
        <select
          name="occupationId"
          value={form.occupationId}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        >
          <option value="">Select Occupation</option>
          {occupations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
        <input
          name="sumInsured"
          type="number"
          placeholder="Death Sum Insured"
          value={form.sumInsured}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </div>

      <button
        onClick={handleCalculate}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Calculate Premium
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {premium !== null && (
        <div style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>
          Monthly Premium: ₹{Number(premium).toLocaleString()}
        </div>
      )}
    </div>
  );
}
