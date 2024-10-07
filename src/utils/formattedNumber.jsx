// formattedNumber.js (utility function, no longer a hook)
const formatNumberInNepali = (num) => {
  // Check if num is a valid number or string; if not, return an empty string or a default value
  if (num === undefined || num === null || isNaN(num)) {
    return ''; // You can return '0' or another fallback value if needed
  }

  // Convert the number to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split('.');

  // Get the last three digits
  let lastThree = integerPart.slice(-3);

  // Get the digits before the last three and insert commas every two digits
  let remainingDigits = integerPart.slice(0, -3);
  if (remainingDigits.length > 0) {
    lastThree = ',' + lastThree;
    remainingDigits = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  }

  // Combine the formatted parts
  const formattedInteger = remainingDigits + lastThree;

  // Combine the formatted integer part with the decimal part, if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export default formatNumberInNepali;
