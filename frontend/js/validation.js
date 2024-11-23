export function validateInput(input) {
    if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
        input.value = 1; 
    }
}

export function attachValidationListeners(inputs) {
    inputs.forEach((input) => {
        input.addEventListener('change', () => validateInput(input));
        input.addEventListener('input', () => validateInput(input));
    });
}