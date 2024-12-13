import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../services/api/AuthApi";
import { Role } from "../constant/enum";
import { User } from "../data/Entities/User";

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => void;
    signup: (firstname: string, lastname: string, username: string, email: string, password: string, role: Role, dateOfBirth: string, phone: string, address: string) =>void;
    logout:() => void,
    loading: boolean,
  }
  
 export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser)); 
                } catch (error) {
                    console.error("Failed to parse user data:", error);
                    localStorage.removeItem('user'); 
                }
            }
            setLoading(false);
        };
    
        fetchUser();
    }, []);
    
    


    const login = async (email: string, password: string) => {
        try {
            const userData = await loginUser(email, password);
            setUser(userData)
            localStorage.setItem('user',  JSON.stringify(userData));
        } catch (error: any) {
            throw error;
        }
    };

    const signup = async (firstname: string, lastname: string, username: string, email: string, password: string, role: Role, dateOfBirth: string, phone: string, address: string) => {
        try {
            setLoading(true);
            const userData = await registerUser(firstname, lastname, username, email, password, role, dateOfBirth, phone, address);
            setUser(userData)
            localStorage.setItem('user',  JSON.stringify(userData));
            setLoading(false);
        } catch (error: any) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await logoutUser();
            localStorage.removeItem('user');
            setUser(null);
            setLoading(false);
        } catch(error: any) {
            throw error;
        }
      
    
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
