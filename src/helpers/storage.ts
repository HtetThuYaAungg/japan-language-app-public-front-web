const saveString = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const getString = (key: string): string | null => {
  try {
    const itemString = localStorage.getItem(key);
    return itemString ? itemString : null;
  } catch {
    return null;
  }
};

export const saveToLocalStorage = async (key: string, value: unknown) => {
  return saveString(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  const itemString = getString(key);
  if (itemString) {
    try {
      return JSON.parse(itemString) as T;
    } catch {
      return null;
    }
  }
  return null;
};
