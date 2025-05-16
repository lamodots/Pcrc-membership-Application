type OptionsTypes = "numeric" | "2-digit" | undefined;
export function monthdayyearFormater(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString);

  // Options for formatting the date
  const options: { year: OptionsTypes; month: "long"; day: OptionsTypes } = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Extract the month, day, and year
  const [month, day, year] = formattedDate.split(" ");

  // Combine them to get the desired format
  const result = `${month} ${day} ${year}`;
  return result;
}
