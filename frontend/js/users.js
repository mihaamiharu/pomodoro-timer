function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

function generateMachineUserId() {
    const components = [
        navigator.userAgent,
        navigator.hardwareConcurrency,
        screen.width,
        screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        generateRandomString()
    ];

    const baseId = components.join('|');
    return btoa(baseId).replace(/[^a-zA-Z0-9]/g, ''); 
}

export function getOrCreateMachineUserId() {
    let userId = localStorage.getItem('machineUserId');
    console.log(`Generated User ID: ${userId}`);
    if (!userId) {
        const firstVisitTimestamp = new Date().getTime();
        const baseId = `${generateMachineUserId()}|${firstVisitTimestamp}`;
        userId = btoa(baseId).replace(/[^a-zA-Z0-9]/g, ''); 
        localStorage.setItem('machineUserId', userId);
        console.log(`Generated User ID: ${userId}`);
    }
    return userId;
}
