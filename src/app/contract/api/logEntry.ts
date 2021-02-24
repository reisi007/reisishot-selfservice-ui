export interface LogEntry {
  email: string;
  timestamp: string;
  log_type: string;
  hash_value: string;
}

export enum LogType {
  OPEN = 'OPEN',
  SIGN = 'SIGN'
}
