import { describe, it, expect, vi, toBe } from 'vitest';
import { validateInput, attachValidationListeners } from '../js/validation.js';

describe('Validation Module', () => {
    it('should reset value to 1 if input is less than 1', () => {
        const mockInput = { value: '-1' }; 
        validateInput(mockInput);
        expect(mockInput.value).toBe(1);
    });

    it('should reset value to 1 if input is not a number', () => {
        const mockInput = { value: 'abc' }; 
        validateInput(mockInput);
        expect(mockInput.value).toBe(1);
    });

    it('should keep valid input unchanged', () => {
        const mockInput = { value: '5' }; 
        validateInput(mockInput);
        expect(mockInput.value).toBe('5');
    });

    it('should attach listeners to multiple inputs', () => {
        const mockInputs = [
            { addEventListener: vi.fn() },
            { addEventListener: vi.fn() },
        ];

        attachValidationListeners(mockInputs);

        mockInputs.forEach((input) => {
            expect(input.addEventListener).toHaveBeenCalledTimes(2); 
            expect(input.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
            expect(input.addEventListener).toHaveBeenCalledWith('input', expect.any(Function));
        });
    });
});
