let timerInterval;
let isRunning = false;
export let activeSession = 'work';

export const durations = {
    work: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

export let timeLeft = durations.work;

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function startTimer(updateDisplay, switchSession) {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--; 
            updateDisplay(); 
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            switchSession();
        }
    }, 1000);
}

export function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

export function resetTimer(updateDisplay) {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = durations[activeSession];
    updateDisplay();
}

export function switchSession(session, updateDisplay) {
    activeSession = session;
    timeLeft = durations[session];
    updateDisplay();
    pauseTimer();
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key, defaultValue) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}

export function applyCustomDurations(newDurations, updateDisplay) {
    durations.work = newDurations.work * 60;
    durations['short-break'] = newDurations.shortBreak * 60;
    durations['long-break'] = newDurations.longBreak * 60;
    saveToLocalStorage('durations', durations);
    timeLeft = durations[activeSession];
    updateDisplay();
}

export function restoreDurationsFromStorage(updateDisplay) {
    const storedDurations = loadFromLocalStorage('durations', durations);
    durations.work = storedDurations.work;
    durations['short-break'] = storedDurations['short-break'];
    durations['long-break'] = storedDurations['long-break'];
    timeLeft = durations[activeSession];
    updateDisplay();
}

export function saveSessionData() {
    const sessionData = {
        activeSession,
        timeLeft,
    };
    saveToLocalStorage('sessionData', sessionData);
}

export function restoreSessionData(updateDisplay) {
    const sessionData = loadFromLocalStorage('sessionData', { activeSession: 'work', timeLeft: durations.work });
    activeSession = sessionData.activeSession;
    timeLeft = sessionData.timeLeft;
    updateDisplay();
}
