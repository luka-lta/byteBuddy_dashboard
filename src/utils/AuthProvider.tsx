import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

type AuthContextType = {
    token: string | null;
    setToken: (newToken: string | null) => void;
    login: (username: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        console.log('Token:', token)
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            fetch('http://localhost/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            }).then((response) => response.json()).then((data) => {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const contextValue = useMemo(
        () => ({
            token,
            login,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
