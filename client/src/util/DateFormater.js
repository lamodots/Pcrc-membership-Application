export function dateFormater(dateString) {
  // Create a new Date object
  const date = new Date(dateString);

  // Options for formatting the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Extract the weekday, month, and day
  const [weekday, month, day] = formattedDate
    .split(", ")
    .map((part) => part.split(" ").slice(0, 2).join(" "));

  // Combine them to get the desired format
  const result = `${weekday}, ${month} ${day}`;
  return result;
}
