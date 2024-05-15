const useSession = () => {
    const isAuthenticated = () => {
        const auth = localStorage.getItem("auth");
        if (auth === null) {
            return false;
        }
        try {
            const { expires } = JSON.parse(auth);
            if (Date.now() > expires) {
                localStorage.removeItem("auth");
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    const login = (token: string, expires_in: number) => {
        const expires = Date.now() + expires_in * 1000;
        localStorage.setItem("auth", JSON.stringify({ token, expires }));
    };

    const logout = () => {
        localStorage.removeItem("auth");
    };

    const getToken = () => {
        const auth = localStorage.getItem("auth");
        return auth ? JSON.parse(auth).token : null;
    };

    return { isAuthenticated, login, logout, getToken };
};

export default useSession;
