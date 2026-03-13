export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeDuration {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  isOvernight: boolean;
}

export function parseTime(timeStr: string): TimeValue | null {
  if (!timeStr) return null;
  
  const parts = timeStr.split(':');
  if (parts.length < 2) return null;
  
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parts[2] ? parseInt(parts[2], 10) : 0;
  
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) return null;
  
  return { hours, minutes, seconds };
}

export function timeToSeconds(time: TimeValue): number {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

export function secondsToTime(totalSeconds: number): TimeValue {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { hours, minutes, seconds };
}

export function calculateDuration(
  startTime: TimeValue,
  endTime: TimeValue,
  includeSeconds: boolean = false
): TimeDuration {
  let startSeconds = timeToSeconds(startTime);
  let endSeconds = timeToSeconds(endTime);
  
  let isOvernight = false;
  let durationSeconds = endSeconds - startSeconds;
  
  // Handle overnight duration
  if (durationSeconds < 0) {
    durationSeconds += 24 * 3600;
    isOvernight = true;
  }
  
  // Round to nearest minute if not including seconds
  if (!includeSeconds) {
    durationSeconds = Math.round(durationSeconds / 60) * 60;
  }
  
  const time = secondsToTime(durationSeconds);
  
  return {
    hours: time.hours,
    minutes: time.minutes,
    seconds: includeSeconds ? time.seconds : 0,
    totalSeconds: durationSeconds,
    totalMinutes: Math.floor(durationSeconds / 60),
    totalHours: durationSeconds / 3600,
    isOvernight
  };
}

export function formatDuration(duration: TimeDuration, includeSeconds: boolean = false): string {
  const parts: string[] = [];
  
  if (duration.hours > 0) {
    parts.push(`${duration.hours} ${duration.hours === 1 ? 'hour' : 'hours'}`);
  }
  
  if (duration.minutes > 0 || (duration.hours === 0 && duration.seconds === 0)) {
    parts.push(`${duration.minutes} ${duration.minutes === 1 ? 'minute' : 'minutes'}`);
  }
  
  if (includeSeconds && duration.seconds > 0) {
    parts.push(`${duration.seconds} ${duration.seconds === 1 ? 'second' : 'seconds'}`);
  }
  
  return parts.join(', ');
}

export function formatTimeValue(time: TimeValue, includeSeconds: boolean = false): string {
  const h = time.hours.toString().padStart(2, '0');
  const m = time.minutes.toString().padStart(2, '0');
  
  if (includeSeconds) {
    const s = time.seconds.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  
  return `${h}:${m}`;
}

export function formatDurationCompact(duration: TimeDuration, includeSeconds: boolean = false): string {
  const h = duration.hours.toString().padStart(2, '0');
  const m = duration.minutes.toString().padStart(2, '0');
  
  if (includeSeconds) {
    const s = duration.seconds.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  
  return `${h}:${m}`;
}

export function getCurrentTime(): string {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function addMinutesToTime(timeStr: string, minutes: number): string {
  const time = parseTime(timeStr);
  if (!time) return timeStr;
  
  let totalMinutes = time.hours * 60 + time.minutes + minutes;
  
  // Handle overflow/underflow
  while (totalMinutes < 0) totalMinutes += 24 * 60;
  while (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;
  
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
