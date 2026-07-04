const EVENTS_KEY = "offline_friends_events";

export function getEvents() {
  const savedEvents = localStorage.getItem(EVENTS_KEY);

  if (!savedEvents) {
    return [];
  }

  return JSON.parse(savedEvents);
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
