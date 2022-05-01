import * as dayjs from 'dayjs';

export function formatDateTime(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY HH:mm');
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY');
}

export function calculateAge(birthday: string, relativeTo?: string): string {
  const age = dayjs(relativeTo).diff(dayjs(birthday), 'year', true);
  return (Math.floor(age * 100) / 100).toString(10);
}
