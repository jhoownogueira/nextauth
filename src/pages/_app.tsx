import type {AppProps} from 'next/app'
import {GlobalStyles} from "@/styles/global";
import {AuthProvider} from "@/contexts/AuthContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <GlobalStyles />
            <Component {...pageProps} />
        </AuthProvider>
)
}
