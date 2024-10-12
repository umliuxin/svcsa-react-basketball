export const formatDateTime = function (dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  // Get the date parts in UTC
  const day = String(dateTime.getUTCDate()).padStart(2, "0");
  const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = dateTime.getUTCFullYear();

  // Get the time parts in UTC
  const hours = String(dateTime.getUTCHours()).padStart(2, "0");
  const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");

  // Format the string as dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDate = function (dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  // Get the date parts in UTC
  const day = String(dateTime.getUTCDate()).padStart(2, "0");
  const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = dateTime.getUTCFullYear();


  // Format the string as dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year}`;
};
