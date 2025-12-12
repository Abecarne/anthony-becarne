let listeners: (() => void)[] = [];
let isHidden = false;

export const sidebarState = {
  isHidden: () => isHidden,
  hide: () => {
    isHidden = true;
    listeners.forEach(listener => listener());
  },
  show: () => {
    isHidden = false;
    listeners.forEach(listener => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
