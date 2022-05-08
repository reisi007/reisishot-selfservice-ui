import * as dayjs from 'dayjs';

export const TEMPLATE_STRING_AS_DATE = 'YYYY-MM-DD';
export const TEMPLATE_DATE = 'DD.MM.YYYY';
export const TEMPLATE_DATETIME = TEMPLATE_DATE + ' HH:mm';

export function formatDateTime(dateString: string): string {
  return dayjs(dateString).format(TEMPLATE_DATETIME);
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format(TEMPLATE_DATE);
}

export function calculateAge(birthday: string, relativeTo?: string): string {
  const age = dayjs(relativeTo).diff(dayjs(birthday), 'year', true);
  return (Math.floor(age * 100) / 100).toFixed(2);
}
