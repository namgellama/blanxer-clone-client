import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";
import { Store } from "@/redux/slices/vendor-store.slice";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

type UserRole = "VENDOR" | "ADMIN";

interface User {
    id: string;
    email: string;
    firstName: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    stores: Store[];
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await api.get<User>(VENDOR_API.user.getMe);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!user || !isAuthenticated) getCurrentUser();
    }, [user, isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, setUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};
