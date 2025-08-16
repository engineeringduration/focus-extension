let endTime = null;  // Timestamp when timer ends
let defaultDuration = 25 * 60; // 25 minutes

function startTimer() {
  if (!endTime) {
    endTime = Date.now() + defaultDuration * 1000;
  }
  chrome.alarms.clear('focusTimer', () => {
    chrome.alarms.create('focusTimer', { periodInMinutes: 1 / 6 }); // Every 10 seconds
  });
}

function pauseTimer() {
  chrome.alarms.clear('focusTimer');
  defaultDuration = getTimeLeft();
  endTime = null;
}

function resetTimer() {
  chrome.alarms.clear('focusTimer');
  defaultDuration = 25 * 60;
  endTime = null;
}

function getTimeLeft() {
  if (!endTime) return defaultDuration;
  const diff = Math.floor((endTime - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
}

chrome.alarms.onAlarm.addListener(() => {
  if (getTimeLeft() <= 0) {
    chrome.alarms.clear('focusTimer');
    endTime = null;
    defaultDuration = 25 * 60;
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Focus Done!',
      message: 'Time to take a break!'
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') startTimer();
  else if (message.action === 'pause') pauseTimer();
  else if (message.action === 'reset') resetTimer();
  else if (message.action === 'getTime') sendResponse({ timeLeft: getTimeLeft() });
});
