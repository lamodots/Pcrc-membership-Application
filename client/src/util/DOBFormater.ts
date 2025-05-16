/**
 *Month Day" format.This format is typically used in casual contexts where the exact time or year is not as critical, Example Birthdays. 
 It's a straightforward way to present a date in a readable and friendly manner.
 * @param isoDate accepts  ISO date in this format = 2010-10-20T00:00:00.000+00:00
 * @function DOBFormater converts the ISO date string  to string "October 20"
 *
 */

export function DOBFormater(isoDate: string) {
  // Original date string

  // Parsing the ISO 8601 date string to a Date object
  const date = new Date(isoDate);

  // Extracting the month and date parts
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
