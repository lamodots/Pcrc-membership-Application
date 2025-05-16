import { formatDistanceToNow } from "date-fns";

export function formatDistanceToNowformat(newdate: string) {
  // Example date
  const date = new Date(newdate);

  // Format the date to a relative time string
  const timeSince = formatDistanceToNow(date, { addSuffix: true });
  return timeSince;
}
