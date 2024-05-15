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

    const login = (token: string, expires_in: number, user: object) => {
        const expires = Date.now() + expires_in * 1000;
        localStorage.setItem("auth", JSON.stringify({ token, expires, user }));
    };

    const logout = () => {
        localStorage.removeItem("auth");
    };

    const getToken = () => {
        const auth = localStorage.getItem("auth");
        return auth ? JSON.parse(auth).token : null;
    };

    const getUser = () => {
        const auth = localStorage.getItem("auth");
        return auth ? JSON.parse(auth).user : null;
    };

    return { isAuthenticated, login, logout, getToken, getUser };
};

export default useSession;
