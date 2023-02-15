export const useLocalStorage = (name: string): Function[] => {
  //get data from local storage
  const getLocalStorage = (): string | null => {
    const data = localStorage.getItem(name);
    if (data !== null) return JSON.parse(data);
    return data;
  };

  //set data to local storage
  const setLocalStorage = (item: object): void => {
    const data = JSON.stringify(item);
    localStorage.setItem(name, data);
  };

  //set data from local storage
  const clearLocalStorage = (): void => {
    localStorage.removeItem(name);
  };

  return [getLocalStorage, setLocalStorage, clearLocalStorage];
};
