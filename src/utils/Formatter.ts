export const Formatter = (UTC: number): string => {
  const date = new Date(UTC * 1000);
  return date.toDateString();
};

export const toTimeStamp = (date: string) => Math.ceil(Date.parse(date) / 1000);

export const priorWeek = () => {
  let current = new Date();
  current.setDate(current.getDate() - 7);
  return new Date(current).toISOString().split('T')[0];
};
