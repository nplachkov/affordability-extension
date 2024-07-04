document.addEventListener('DOMContentLoaded', () => {
  const fields = ['annualSalary', 'otherGrossDeductions', 'deductionsRG', 'weeklyHours', 'weeksWorked', 'nmwRate', 'nmwThreshold'];

  // Restore saved inputs
  chrome.storage.sync.get(fields, (data) => {
    fields.forEach(field => {
      document.getElementById(field).value = data[field] || '';
    });
  });

  // Save inputs on change
  fields.forEach(field => {
    document.getElementById(field).addEventListener('input', () => {
      let inputData = {};
      inputData[field] = document.getElementById(field).value;
      chrome.storage.sync.set(inputData);
    });
  });

  document.getElementById('calculate').addEventListener('click', function() {
    try {
      let salary = parseFloat(document.getElementById('annualSalary').value);
      let otherGrossDeductions = parseFloat(document.getElementById('otherGrossDeductions').value);
      let deductionsRG = parseFloat(document.getElementById('deductionsRG').value);
      let hoursWorked = parseFloat(document.getElementById('weeklyHours').value);
      let weeksWorked = parseFloat(document.getElementById('weeksWorked').value);
      let nmwRate = parseFloat(document.getElementById('nmwRate').value);
      let nmwThreshold = parseFloat(document.getElementById('nmwThreshold').value) / 100;

      let newNMWRate = nmwRate + (nmwRate * nmwThreshold);
      let minimumPayment = newNMWRate * weeksWorked * hoursWorked;
      let affordability = salary - minimumPayment - otherGrossDeductions - deductionsRG;

      document.getElementById('resultLabel').innerText = `Affordability: £${affordability.toFixed(2)}`;
      document.getElementById('copyButton').style.display = 'inline';
      document.getElementById('copyStatus').innerText = '';  // Clear previous copy status message

      document.getElementById('copyButton').addEventListener('click', function() {
        navigator.clipboard.writeText(`£${affordability.toFixed(2)}`).then(function() {
          document.getElementById('copyStatus').innerText = 'Copied to clipboard!';
        }, function() {
          document.getElementById('copyStatus').innerText = 'Failed to copy.';
        });
      });

    } catch (e) {
      alert('Please enter valid numbers for all fields.');
    }
  });

  document.getElementById('clearAll').addEventListener('click', function() {
    fields.forEach(field => {
      document.getElementById(field).value = '';
    });
    document.getElementById('resultLabel').innerText = '';
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('copyStatus').innerText = '';  // Clear copy status message

    // Clear saved inputs
    chrome.storage.sync.clear();
  });
});
