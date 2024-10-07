const useFrequencyValues = (frequency) => {
  switch (frequency) {
    case "monthly":
      return { periodsPerYear: 12, label: "Month" };
    case "quarterly":
      return { periodsPerYear: 4, label: "Quarter" }; // Corrected to 4
    case "half-yearly": // "semi-annually" is also acceptable, but keeping your term
      return { periodsPerYear: 2, label: "Half Year" };
    case "yearly": // "annually" can be changed to "yearly" for consistency
      return { periodsPerYear: 1, label: "Year" };
    default:
      return { periodsPerYear: 12, label: "Month" }; // Default case
  }
};

export default useFrequencyValues;
