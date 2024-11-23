import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    durations,
    applyCustomDurations,
    restoreDurationsFromStorage,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetTimer,
} from '../js/timer.js';

beforeEach(() => {
    durations.work = 25 * 60;
    durations['short-break'] = 5 * 60;
    durations['long-break'] = 15 * 60;

    vi.clearAllMocks();

    Object.defineProperty(global, 'localStorage', {
        value: {
            getItem: vi.fn(),
            setItem: vi.fn(),
        },
        configurable: true,
    });
});

describe('Timer Module - Local Storage and Customization', () => {
    it('should save durations to local storage', () => {
        const newDurations = { work: 30, shortBreak: 10, longBreak: 20 };
        applyCustomDurations(newDurations, () => {});
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'durations',
            JSON.stringify({
                work: 30 * 60,
                'short-break': 10 * 60,
                'long-break': 20 * 60,
            })
        );
    });

    it('should load durations from local storage', () => {
        localStorage.getItem.mockReturnValue(
            JSON.stringify({
                work: 1800,
                'short-break': 600,
                'long-break': 1200,
            })
        );
        restoreDurationsFromStorage(() => {});
        expect(durations.work).toBe(1800);
        expect(durations['short-break']).toBe(600);
        expect(durations['long-break']).toBe(1200);
    });

    it('should reset timer to current session duration', () => {
        durations.work = 30 * 60;
        resetTimer(() => {});
        expect(durations.work).toBe(30 * 60);
    });

    it('should not crash when local storage is empty', () => {
        localStorage.getItem.mockReturnValue(null);
        const defaultDurations = { work: 25 * 60, 'short-break': 5 * 60, 'long-break': 15 * 60 };
        restoreDurationsFromStorage(() => {});
        expect(durations.work).toBe(defaultDurations.work);
        expect(durations['short-break']).toBe(defaultDurations['short-break']);
        expect(durations['long-break']).toBe(defaultDurations['long-break']);
    });

    it('should sync input fields with durations', () => {
        durations.work = 40 * 60;
        durations['short-break'] = 8 * 60;
        durations['long-break'] = 20 * 60;

        const mockUpdateDisplay = vi.fn();
        restoreDurationsFromStorage(mockUpdateDisplay);

        expect(durations.work).toBe(40 * 60);
        expect(durations['short-break']).toBe(8 * 60);
        expect(durations['long-break']).toBe(20 * 60);
    });
});
