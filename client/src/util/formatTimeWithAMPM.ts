export function formatTimeWithAmPm(time: string): string {
  const [hours, minutes] = time.split(":");
  const intHours = parseInt(hours, 10);
  const suffix = intHours >= 12 ? "PM" : "AM";
  const formattedHours = intHours % 12 || 12;
  return `${formattedHours}:${minutes} ${suffix}`;
}
