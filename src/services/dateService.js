/* Parse input date into an object with day, month, year. */
export function parseInputDate(input) {
  if (!input) {
    throw new Error('Date input is required');
  }

  const dateObject = new Date(input);
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid new Date(input)');
  }

  return {
    fullDate: input,
    day: String(dateObject.getDate()).padStart(2, '0'),
    month: String(dateObject.getMonth() + 1).padStart(2, '0'),
    year: dateObject.getFullYear(),
  };
}