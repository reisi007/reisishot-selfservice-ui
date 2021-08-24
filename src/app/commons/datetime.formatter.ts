import * as dayjs from 'dayjs';

export function formatDateTime(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY HH:mm');
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format('DD.MM.YYYY');
}
