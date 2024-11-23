import {
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
    formatTime,
    applyCustomDurations,
    restoreDurationsFromStorage,
    saveSessionData,
    restoreSessionData,
    durations,
    timeLeft,
} from './timer.js';
import { updateTimerDisplay } from './dom.js';

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workTab = document.getElementById('work-tab');
const shortBreakTab = document.getElementById('short-break-tab');
const longBreakTab = document.getElementById('long-break-tab');
const workInput = document.getElementById('work-duration');
const shortBreakInput = document.getElementById('short-break-duration');
const longBreakInput = document.getElementById('long-break-duration');

function renderTimer() {
    updateTimerDisplay(timerDisplay, formatTime(timeLeft));
}

function syncInputsWithDurations() {
    workInput.value = durations.work / 60;
    shortBreakInput.value = durations['short-break'] / 60;
    longBreakInput.value = durations['long-break'] / 60;
}

function handleTabSwitch(e) {
    const newSession = e.target.id.replace('-tab', '');
    switchSession(newSession, renderTimer);
    document.querySelectorAll('.tabs button').forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');
    saveSessionData();
}

function handleCustomDurationChange() {
    const newDurations = {
        work: parseInt(workInput.value),
        shortBreak: parseInt(shortBreakInput.value),
        longBreak: parseInt(longBreakInput.value),
    };
    applyCustomDurations(newDurations, renderTimer);
    renderTimer();
    
}

workTab.addEventListener('click', handleTabSwitch);
shortBreakTab.addEventListener('click', handleTabSwitch);
longBreakTab.addEventListener('click', handleTabSwitch);
startBtn.addEventListener('click', () => startTimer(renderTimer, renderTimer));
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => {
    resetTimer(renderTimer);
    saveSessionData();
});
workInput.addEventListener('change', handleCustomDurationChange);
shortBreakInput.addEventListener('change', handleCustomDurationChange);
longBreakInput.addEventListener('change', handleCustomDurationChange);

restoreDurationsFromStorage(renderTimer);
restoreSessionData(renderTimer);
syncInputsWithDurations();