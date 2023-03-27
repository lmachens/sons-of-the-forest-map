export function getItem<T>(key: string, defaultValue: T) {
  let value = defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item) {
      value = JSON.parse(item);
    }
  } catch (error) {
    //
  }
  return value;
}

export function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
