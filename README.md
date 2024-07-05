# Affordability calculator
This Chrome extension allows you to calculate the user's affordability based on the National Minimum Wage (NMW) in the UK. It provides a simple interface where you can input their salary details and deductions to determine their affordability.

## Features
- **Input Fields:** Allows users to input Annual Salary, Weekly Hours, Weeks Worked, Other Gross Deductions, Deductions through RG, NMW Rate, and NMW Threshold %.
- **Calculation:** Calculates affordability based on the formula:

```bash
Affordability = Annual Salary - Minimum Salary - Other Gross Deductions - Deductions through RG
```

Where,

- Minimum Salary = Adjusted NMW * Weekly Hours * Weeks Worked

- Adjusted NMW = NMW Rate + (NMW Rate * NMW Threshold %)

- **Copy to Clipboard:** Allows users to copy the affordability amount (£) to their clipboard for easy sharing or record-keeping.

- **Clear All:** Clears all input fields and resets the calculation.

## Installation
To use the extension:

1. Download the repository as a ZIP file or clone it using Git:

```bash
  git clone https://github.com/nplachkov/affordability-extension.git
```

2. Open Google Chrome and navigate to chrome://extensions/.

3. Enable "Developer mode" by clicking the toggle switch on the top right.

4. Click on "Load unpacked" and select the directory where you cloned/downloaded this repository.

The extension icon should appear in your Chrome toolbar. Click on it to open the Affordability Calculator. Make sure to pin it for quick access.

## Usage
1. Fill in all required fields: Annual Salary, Weekly Hours, Weeks Worked, Other Gross Deductions, Deductions through RG, NMW Rate, and NMW Threshold %.

2. Click on the "Calculate" button to see the affordability calculation.

3. Optionally, click on the "Copy" button to copy the affordability amount (£) to your clipboard.

4. Use the "Clear" button to reset all fields and calculations.

## Support
For any issues or feature requests, please [open an issue](https://github.com/nplachkov/affordability-extension/issues) here on GitHub.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request with your improvements.

## License
This project is licensed under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).
