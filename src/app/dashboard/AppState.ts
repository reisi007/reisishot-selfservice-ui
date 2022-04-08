declare global {
  interface Window {
    states: {
      [key: string]: object
    };
  }
}

export function accessState<T extends object>(name: string, initial?: T): T {
  if (window.states === undefined) {
    window.states = {};
  }
  window.states[name] = window.states[name] || initial || {};
  return window.states[name] as T;
}
