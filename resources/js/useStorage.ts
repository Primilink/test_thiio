const useStorage = () => {
    const setItem = (key: string, value: any) => {
        console.log("setItem", key, value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = (key: string) => {
        console.log("getItem", key);
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const removeItem = (key: string) => {
        console.log("removeItem", key);
        localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
};

export default useStorage;
