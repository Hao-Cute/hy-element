export interface AlertProps {
  content?: string;
  type?: 'primary' | 'success' | 'warning' | 'info' | 'error';
  effect?: 'light' | 'dark';
  closable?: boolean;
}

export interface AlertEvents {
  (e: 'close'): void
}

export interface AlertInstance {
  ref: HTMLDivElement;
  close: () => void;
}
