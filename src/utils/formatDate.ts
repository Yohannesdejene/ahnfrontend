function convertISOToNormalDate(isoDate: string | undefined): string {
  if (!isoDate) {
    return "";
  }
  const date = new Date(isoDate);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // Month by name (e.g., "January")
    day: "numeric",
  };

  // Format the date
  return date.toLocaleDateString(undefined, options);
}
export default convertISOToNormalDate;
