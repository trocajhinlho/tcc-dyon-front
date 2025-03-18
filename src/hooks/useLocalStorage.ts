const useLocalStorage = <T = string>(key: string, isJson = false): [() => T | null, (value: T) => void, () => void] => {
    const getItem = (): T | null => {
        const data = localStorage.getItem(key);
        if(isJson && data)
            return JSON.parse(data) as T;
        return data as T | null;
    }

    const setItem = (value: T): void => {
        let formatted = isJson ? JSON.stringify(value) : value as string;
        localStorage.setItem(key, formatted);
    }

    const clearItem = (): void => localStorage.removeItem(key);

    return [getItem, setItem, clearItem];
}

export default useLocalStorage;