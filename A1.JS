document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculateBtn'); // Fixed ID
    const salaryInput = document.getElementById('salary');
    const salaryUnitSelect = document.getElementById('salaryUnit');
    const taxRateInput = document.getElementById('taxRate');
    const cabDeductionInput = document.getElementById('cabDeduction');
    const resultsDiv = document.getElementById('results');
    const resultAnnual = document.getElementById('resultAnnual');
    const resultMonthly = document.getElementById('resultMonthly');
    const resultTaxRate = document.getElementById('resultTaxRate');
    const resultTax = document.getElementById('resultTax');
    const resultCab = document.getElementById('resultCab');
    const resultTakeHome = document.getElementById('resultTakeHome');
    const summaryMonthly = document.getElementById('summaryMonthly');
    const summaryTax = document.getElementById('summaryTax');
    const summaryCab = document.getElementById('summaryCab');
    const taxMessage = document.getElementById('taxMessage');

    // Conversion factors
    const unitConversion = {
        'lpa': 100000,    // 1 LPA = 100,000 rupees
        'cr': 10000000,   // 1 Cr = 10,000,000 rupees
        'k': 1000,        // 1k = 1,000 rupees
        'rupees': 1       // 1 rupee = 1 rupee
    };

    calculateBtn.addEventListener('click', function () {
        const salaryValue = parseFloat(salaryInput.value);
        const salaryUnit = salaryUnitSelect.value;
        const taxRate = parseFloat(taxRateInput.value);
        const monthlyCabDeduction = parseFloat(cabDeductionInput.value);

        // Validation
        if (isNaN(salaryValue) || salaryValue < 0) {
            alert('Please enter a valid salary amount');
            return;
        }

        if (isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
            alert('Please enter a valid tax rate between 0 and 100');
            return;
        }

        if (isNaN(monthlyCabDeduction) || monthlyCabDeduction < 0) {
            alert('Please enter a valid cab deduction amount');
            return;
        }

        // Convert salary to rupees based on selected unit
        const salaryInRupees = salaryValue * unitConversion[salaryUnit];

        // Calculate monthly salary
        const monthlySalary = salaryInRupees / 12;

        // Calculate tax based on manual tax rate
        const annualTax = salaryInRupees * (taxRate / 100);

        // Calculate cab deduction (for all employees)
        const annualCabDeduction = monthlyCabDeduction * 12;

        // Calculate take home salary
        const annualTakeHome = salaryInRupees - annualTax - annualCabDeduction;
        const monthlyTakeHome = annualTakeHome / 12;
        const monthlyTax = annualTax / 12;

        // Update UI with results
        resultAnnual.textContent = formatCurrency(salaryInRupees);
        resultMonthly.textContent = formatCurrency(monthlySalary);
        resultTaxRate.textContent = taxRate.toFixed(1) + '%';
        resultTax.textContent = formatCurrency(annualTax);
        resultCab.textContent = formatCurrency(annualCabDeduction);
        resultTakeHome.textContent = formatCurrency(annualTakeHome);

        // Update summary
        summaryMonthly.textContent = formatCurrency(monthlyTakeHome);
        summaryTax.textContent = formatCurrency(monthlyTax);
        summaryCab.textContent = formatCurrency(monthlyCabDeduction);

        // Update tax message
        taxMessage.textContent = `Tax calculated at ${taxRate.toFixed(1)}% of annual salary.`;

        // Show results
        resultsDiv.classList.add('show');
    });

    // Helper function to format currency in Indian Rupees
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        });
    }

    // Add functionality to parse salary input with units
    salaryInput.addEventListener('input', function () {
        const value = salaryInput.value.toLowerCase();

        // Check if the input contains unit indicators
        if (value.includes('lpa')) {
            salaryUnitSelect.value = 'lpa';
            salaryInput.value = value.replace('lpa', '').trim();
        } else if (value.includes('cr')) {
            salaryUnitSelect.value = 'cr';
            salaryInput.value = value.replace('cr', '').trim();
        } else if (value.includes('k')) {
            salaryUnitSelect.value = 'k';
            salaryInput.value = value.replace('k', '').trim();
        } else if (value.includes('₹') || /[0-9,]+\s*(rupees?)/.test(value)) {
            salaryUnitSelect.value = 'rupees';
            salaryInput.value = value.replace(/[₹\s]|rupees?/g, '').trim();
        }
    });
});