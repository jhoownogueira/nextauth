import {createContext, ReactNode, useEffect, useState} from "react";
import {api} from "@/services/api";
import {useRouter} from "next/router";
import {parseCookies, setCookie} from 'nookies';

interface User {
    email: string,
    permissions: string[],
    roles: string[],
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    user: User | undefined;
    isAuthenticated: boolean;
}

interface AuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProvider) {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextauth.token': token }= parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const {email, permissions, roles} = response.data;

                setUser({email, permissions, roles});
            })
        }
    }, [])

    async function signIn({email, password}: SignInCredentials) {
        try {
            const response = await api.post('sessions', {
                email,
                password
            })

            const {token, refreshToken, permissions, roles} = response.data;

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });

            setUser({
                email,
                permissions,
                roles
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            await router.push('/dashboard');

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <AuthContext.Provider value={{
            signIn,
            isAuthenticated,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
}