export const formatDate: (date: Date) => string = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
