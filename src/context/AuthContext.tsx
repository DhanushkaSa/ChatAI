import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";


const AuthContext = createContext<{ user: any } | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};