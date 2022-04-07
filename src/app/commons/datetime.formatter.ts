import * as dayjs from 'dayjs';

export function formatDateTime(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY HH:mm');
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY');
}

export function calculateAge(birthday: string, relativeTo?: string): string {
  return dayjs(relativeTo).diff(dayjs(birthday), 'year', true).toFixed(2);
}
