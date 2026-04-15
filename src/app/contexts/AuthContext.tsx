import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "petani" | "koperasi" | "distributor";
type SubscriptionTier = "free" | "premium";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionTier;
  location?: string;
  farmSize?: string;
  scanCount?: number; // For free tier limits
  lastScanDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
  canUseScan: () => boolean;
  incrementScanCount: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location?: string;
  farmSize?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user data
    setUser({
      id: "user-123",
      name: "Budi Santoso",
      email: email,
      role: "petani",
      subscription: "free",
      location: "Jember, Jawa Timur",
      farmSize: "12.5 Ha",
      scanCount: 0,
      lastScanDate: new Date().toISOString()
    });
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      subscription: "free",
      location: data.location,
      farmSize: data.farmSize,
      scanCount: 0,
      lastScanDate: new Date().toISOString()
    });
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, subscription: "premium" });
    }
  };

  const canUseScan = (): boolean => {
    if (!user) return false;
    if (user.subscription === "premium") return true;
    
    // Free users: 2 scans per month
    const currentMonth = new Date().getMonth();
    const lastScanMonth = user.lastScanDate ? new Date(user.lastScanDate).getMonth() : -1;
    
    if (currentMonth !== lastScanMonth) {
      // Reset count for new month
      return true;
    }
    
    return (user.scanCount || 0) < 2;
  };

  const incrementScanCount = () => {
    if (user && user.subscription === "free") {
      setUser({ 
        ...user, 
        scanCount: (user.scanCount || 0) + 1,
        lastScanDate: new Date().toISOString()
      });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isPremium: user?.subscription === "premium",
    login,
    register,
    logout,
    upgradeToPremium,
    canUseScan,
    incrementScanCount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
