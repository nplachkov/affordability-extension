document.addEventListener('DOMContentLoaded', function () {
  const fields = [
    'annualSalary',
    'weeklyHours',
    'weeksWorked',
    'otherGrossDeductions',
    'deductionsThroughRG',
    'nmwRate',
    'nmwThresholdPercent'
  ];

  // Function to get field value and validate input
  function getFieldValue(field) {
    const element = document.getElementById(field);
    const value = element.value.trim(); // Trim to remove leading/trailing whitespace

    // Check if the value is a valid number (including decimals)
    const isValid = /^\d*\.?\d*$/.test(value);

    if (isValid || value === '') {
      element.classList.remove('error');
      return parseFloat(value) || 0; // Return parsed float or 0 if empty
    } else {
      element.classList.add('error');
      return 0; // Return 0 for invalid inputs
    }
  }

  // Calculate button click event
  document.getElementById('calculate').addEventListener('click', function () {
    // Get input values
    const annualSalary = getFieldValue('annualSalary');
    const weeklyHours = getFieldValue('weeklyHours');
    const weeksWorked = getFieldValue('weeksWorked');
    const otherGrossDeductions = getFieldValue('otherGrossDeductions');
    const deductionsThroughRG = getFieldValue('deductionsThroughRG');
    const nmwRate = getFieldValue('nmwRate');
    const nmwThresholdPercent = getFieldValue('nmwThresholdPercent') / 100;

    // Calculate adjusted NMW rate
    const adjustedNMW = nmwRate + (nmwRate * nmwThresholdPercent);

    // Calculate minimum salary
    const minimumSalary = adjustedNMW * weeklyHours * weeksWorked;

    // Calculate affordability
    const affordability = annualSalary - minimumSalary - otherGrossDeductions - deductionsThroughRG;

    // Display affordability result
    const resultLabel = document.getElementById('resultLabel');
    resultLabel.textContent = `Affordability: £${affordability.toFixed(2)}`;

    // Show copy button
    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'inline-block';
  });

  // Copy button click event
  document.getElementById('copyButton').addEventListener('click', function () {
    const resultLabel = document.getElementById('resultLabel');
    const resultText = resultLabel.textContent.trim();

    // Extract numeric value from resultText
    const regex = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    const match = resultText.match(regex);
    const amount = match ? match[0] : '';

    const formattedText = `£${amount}`;

    const tempInput = document.createElement('textarea');
    tempInput.value = formattedText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show copy status
    const copyStatus = document.getElementById('copyStatus');
    copyStatus.textContent = 'Copied!';
  });

  // Clear All button click event
  const clearAllButton = document.getElementById('clearAll');
  clearAllButton.addEventListener('click', function () {
    fields.forEach(field => {
      const element = document.getElementById(field);
      element.value = '';
      element.classList.remove('error'); // Remove error class
    });

    // Reset result and hide copy button
    const resultLabel = document.getElementById('resultLabel');
    resultLabel.textContent = '';
    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'none';
    const copyStatus = document.getElementById('copyStatus');
    copyStatus.textContent = '';
  });
});
