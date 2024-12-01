import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export interface IAuthState {
  token: string | null;
  authenticated: boolean | null;
}

interface IAuthProps {
  authState?: IAuthState;
  onLogin?: (email: string, password: string) => Promise<any>;
  onRegister?: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
  onProfile?: (token: string) => Promise<any>;
}

const TOKEN_KEY = "testers";
const AuthContext = createContext<IAuthProps>({});

const BASE_URL = "http://192.168.178.24:3000/api/users";

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token: token, authenticated: true });
      }
    };
    loadToken();
  }, []);

  const register = async (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/reg`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, surname }),
      }).then((res) => res.json());
      if (res.token) {
        const { token } = res;
        setAuthState({ token: token, authenticated: true });
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
      return res;
    } catch (err) {
      return err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json()).catch((err) => console.log(err));
      if (res.token) {
        const { token } = res;
        setAuthState({ token: token, authenticated: true });
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
      return res;
    } catch (err) {
      return err;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const getProfile = async (token: String) => {
    const res = fetch(`${BASE_URL}/profile`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState,
    onProfile: getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
