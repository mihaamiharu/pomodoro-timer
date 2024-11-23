import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOrCreateMachineUserId } from '../js/users.js';

describe('users.js', () => {
    beforeEach(() => {
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
        };

        global.navigator = {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            platform: 'Win64',
            hardwareConcurrency: 8,
        };

        global.screen = {
            width: 1920,
            height: 1080,
        };

        vi.restoreAllMocks();
    });

    it('should generate a new user ID if none exists in localStorage', () => {
        localStorage.getItem.mockReturnValue(null);
        const userId = getOrCreateMachineUserId();
        expect(userId).toBeDefined();
        expect(localStorage.setItem).toHaveBeenCalledWith('machineUserId', userId);
    });

    it('should return the existing user ID from localStorage if it exists', () => {
        const existingUserId = 'testUser123';
        localStorage.getItem.mockReturnValue(existingUserId);
        const userId = getOrCreateMachineUserId();
        expect(userId).toBe(existingUserId);
    });

    it('should store the generated user ID in localStorage', () => {
        localStorage.getItem.mockReturnValue(null);
        const userId = getOrCreateMachineUserId();
        expect(localStorage.setItem).toHaveBeenCalledWith('machineUserId', userId);
    });

    it('should generate a unique user ID using browser-specific components', () => {
        localStorage.getItem.mockReturnValue(null);
        const userId1 = getOrCreateMachineUserId();
        localStorage.clear();
        const userId2 = getOrCreateMachineUserId();
        expect(userId1).not.toBe(userId2);
    });
});
