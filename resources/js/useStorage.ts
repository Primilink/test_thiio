const useStorage = () => {
    const setItem = (key: string, value: any) => {
        console.log("<useStorage> setItem", key, value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = (key: string) => {
        console.log("<useStorage> getItem", key);
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const removeItem = (key: string) => {
        console.log("<useStorage> removeItem", key);
        localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
};

export default useStorage;
