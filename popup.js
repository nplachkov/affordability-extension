document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculate');
  const clearAllButton = document.getElementById('clearAll');
  const resultLabel = document.getElementById('resultLabel');
  const copyButton = document.getElementById('copyButton');
  const copyStatus = document.getElementById('copyStatus');

  const fields = [
    'annualSalary',
    'weeklyHours',
    'weeksWorked',
    'otherGrossDeductions',
    'deductionsThroughRG',
    'nmwRate',
    'nmwThresholdPercent'
  ];

  function loadValues() {
    fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        const value = localStorage.getItem(field);
        element.value = value ? value : '';
      }
    });
  }

  function saveValues() {
    fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        localStorage.setItem(field, element.value);
      }
    });
  }

  function clearValues() {
    fields.forEach(field => {
      const element = document.getElementById(field);
      if (element) {
        element.value = '';
        localStorage.removeItem(field);
      }
    });
    resultLabel.textContent = '';
    copyButton.style.display = 'none';
    copyStatus.textContent = '';
    document.querySelectorAll('.input-group').forEach(group => {
      group.style.backgroundColor = ''; // Reset the background color
    });
  }

  function highlightInvalidField(field) {
    const element = document.getElementById(field);
    if (element) {
      element.style.backgroundColor = 'red';
    }
  }

  function removeHighlight(field) {
    const element = document.getElementById(field);
    if (element) {
      element.style.backgroundColor = '';
    }
  }

  function calculateAffordability() {
    let isValid = true;
    const values = fields.map(field => {
      const element = document.getElementById(field);
      const value = element ? element.value : '';
      if (value === '') {
        return 0;
      } else if (!/^\d*\.?\d*$/.test(value)) { // Allow numbers with optional decimal point
        highlightInvalidField(field);
        isValid = false;
        return null;
      } else {
        removeHighlight(field);
        return parseFloat(value);
      }
    });

    if (!isValid) {
      resultLabel.textContent = 'Please correct the highlighted fields. Only numbers are allowed.';
      copyButton.style.display = 'none';
      return;
    }

    const [
      salary,
      hoursWorked,
      weeksWorked,
      otherGrossDeductions,
      deductionsRG,
      nmwRate,
      nmwThresholdPercent
    ] = values;

    const newNMWRate = nmwRate + (nmwRate * (nmwThresholdPercent / 100));
    const minimumPayment = newNMWRate * weeksWorked * hoursWorked;
    const affordability = salary - minimumPayment - otherGrossDeductions - deductionsRG;

    resultLabel.textContent = `Affordability: £${affordability.toFixed(2)}`;
    copyButton.style.display = 'inline';
  }

  function copyToClipboard() {
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
  }

  loadValues();

  calculateButton.addEventListener('click', () => {
    calculateAffordability();
    saveValues();
  });

  clearAllButton.addEventListener('click', clearValues);
  copyButton.addEventListener('click', copyToClipboard);
});
