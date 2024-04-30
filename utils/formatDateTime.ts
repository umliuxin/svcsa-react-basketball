export const formatDateTime = function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = `${dateTime.toISOString().split('T')[0]} ${dateTime.toTimeString().split(' ')[0]}`;
    return formattedDateTime;
  }