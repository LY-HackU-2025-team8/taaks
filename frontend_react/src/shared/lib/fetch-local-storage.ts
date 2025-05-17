import { NoDataFoundError } from '../api/errors/no-data-found';

export const fetchLocalStorage = <T>(key: string) =>
  new Promise<T>((resolve, reject) => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        resolve(JSON.parse(data));
      } else {
        reject(new NoDataFoundError(`No data found for key: ${key}`));
      }
    } catch (error) {
      reject(error);
    }
  });
