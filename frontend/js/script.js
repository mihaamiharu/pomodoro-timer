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
import { renderTasks, initializeTaskListeners } from './tasks.js';
import { updateTimerDisplay } from './dom.js';
import { attachValidationListeners } from './validation.js';

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

const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

function setCircleProgress(progress) {
    const offset = (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function renderTimer() {
    updateTimerDisplay(timerDisplay, formatTime(timeLeft));
    const currentSession = document.querySelector('.tabs .active').id.replace('-tab', '');
    const totalTime = durations[currentSession];
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    setCircleProgress(progress);
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
    setCircleProgress(0);
}

function handleSessionEnd() {
    const currentSession = document.querySelector('.tabs .active').id.replace('-tab', '');

    let nextSession;
    if (currentSession === 'work') {
        nextSession = 'short-break';
    } else if (currentSession === 'short-break') {
        nextSession = 'long-break';
    } else {
        nextSession = 'work';
    }

    switchSession(nextSession, renderTimer);
    document.querySelectorAll('.tabs button').forEach((btn) => btn.classList.remove('active'));
    document.getElementById(`${nextSession}-tab`).classList.add('active');
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
startBtn.addEventListener('click', () => startTimer(renderTimer, handleSessionEnd));
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => {
    resetTimer(renderTimer);
    saveSessionData();
    setCircleProgress(0);
});
workInput.addEventListener('change', handleCustomDurationChange);
shortBreakInput.addEventListener('change', handleCustomDurationChange);
longBreakInput.addEventListener('change', handleCustomDurationChange);

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }

    restoreDurationsFromStorage(renderTimer);
    restoreSessionData(renderTimer);
    syncInputsWithDurations();
    initializeTaskListeners();
    renderTasks();
    attachValidationListeners([workInput, shortBreakInput, longBreakInput]);
    const progressRing = document.querySelector('.progress-ring');
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    setCircleProgress(0);
});
