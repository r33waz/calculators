const AmortizationTable = (principal, monthlyRate, totalMonths, emi) => {
    let balance = principal;
    const table = [];
    const startDate = new Date(); // Get the current date
  
    for (let i = 0; i < totalMonths; i++) {
      const interestForMonth = parseFloat((balance * monthlyRate).toFixed(2)); // Calculate and round interest for the month
      const principalForMonth = parseFloat((emi - interestForMonth).toFixed(2)); // Calculate and round principal part of EMI
      balance = parseFloat((balance - principalForMonth).toFixed(2)); // Update and round remaining balance after payment
  
      if (balance < 0) balance = 0;
  
      const currentDate = new Date();
      currentDate.setMonth(startDate.getMonth() + i); // Correctly increment month
  
      const monthName = currentDate.toLocaleString('default', {
        month: 'long',
      });
      const year = currentDate.getFullYear();
  
      // Push details for each month
      table.push({
        month: monthName,
        year: year,
        emi: emi.toFixed(0),
        principalPaid: principalForMonth.toFixed(0),
        interestPaid: interestForMonth.toFixed(0),
        remainingBalance: balance.toFixed(0),
      });
    }
  
    // Group table by year
    const groupedByYear = table.reduce((acc, current) => {
      const year = current.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(current);
      return acc;
    }, {});
  
    return groupedByYear;
  };
  
  export default AmortizationTable;
  