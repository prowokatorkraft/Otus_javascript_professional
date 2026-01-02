
import { useState } from 'react';

type StoredValue<T> = T | null;

function useLocalStorage<T>(key: string, initialValue: T): [StoredValue<T>, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue;
        } catch (e) {
            console.warn(e);
            return initialValue;
        }
    });

    const setValue = (value: T): void => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (e) {
            console.warn(e)
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;

//const [theme, setTheme] = useLocalStorage('theme', 'light');