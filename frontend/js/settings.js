import { timerState, resetTimer } from './timer.js';

export function applyCustomDurations(workInput, shortBreakInput, longBreakInput, updateDisplay) {
    timerState.workDuration = parseInt(workInput.value) * 60;
    timerState.shortBreakDuration = parseInt(shortBreakInput.value) * 60;
    timerState.longBreakDuration = parseInt(longBreakInput.value) * 60;

    resetTimer(updateDisplay); 
}