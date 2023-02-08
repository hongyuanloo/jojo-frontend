import axios, { AxiosInstance } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createContext, ReactNode, useState } from "react";
import { axiosPublic } from "../requestMethods/axiosPublic";

// store tokens
interface Itokens {
  accessToken: string;
  refreshToken: string;
}

// store user infor
interface Iuser {
  id: string;
  role: "ADMIN" | "BASIC";
  username: string;
}

// store user and tokens info
interface IuserAuthInfo {
  tokens: Itokens;
  user: Iuser;
}

// for user, tokens and axiosJWT
interface IauthContext {
  userAuthInfo: IuserAuthInfo;
  setUserAuthInfo: React.Dispatch<React.SetStateAction<IuserAuthInfo>>;
  axiosJWT: AxiosInstance;
}

const defaulUserAuthInfo: IuserAuthInfo = {
  tokens: { accessToken: "", refreshToken: "" },
  user: { id: "", role: "BASIC", username: "" },
};

// context for authentication, store userAuthInfo, setUserAuthInfo and axiosJWT
export const AuthContext = createContext<IauthContext>({} as IauthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userAuthInfo, setUserAuthInfo] =
    useState<IuserAuthInfo>(defaulUserAuthInfo);

  const reqHeader = {
    headers: { authorization: "Bearer " + userAuthInfo.tokens.refreshToken },
  };

  async function getNewToken() {
    try {
      const response = await axiosPublic.get(`/auth/access-token`, reqHeader);

      if (response) {
        setUserAuthInfo((prev) => ({
          tokens: { ...prev.tokens, accessToken: response.data.accessToken },
          user: { ...prev.user },
        }));
      }

      return response.data.accessToken;
    } catch (error) {
      throw new Error("Fail to get new accessToken.");
    }
  }

  // axiosJWT instance is used to access protected routes that requires JWT
  const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL,
    timeout: 5000, //in ms
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = userAuthInfo.tokens;

      // accessToken is ""
      if (!accessToken) return config;

      const currentDate_ms = Date.now();
      const decodedRefreshToken_exp_ms =
        (jwtDecode<JwtPayload>(refreshToken).exp ?? 0) * 1000;

      // refreshToken has expired.
      if (decodedRefreshToken_exp_ms < currentDate_ms) return config;

      const decodedAccessToken_exp_ms =
        (jwtDecode<JwtPayload>(accessToken).exp ?? 0) * 1000;

      // accessToken has expired.
      if (decodedAccessToken_exp_ms < currentDate_ms) {
        // get new token.
        const newAccessToken = await getNewToken();
        config.headers["authorization"] = "Bearer " + newAccessToken;
      }

      // accessToken has not expired.
      config.headers["authorization"] = "Bearer " + accessToken;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ userAuthInfo, setUserAuthInfo, axiosJWT }}>
      {children}
    </AuthContext.Provider>
  );
}
