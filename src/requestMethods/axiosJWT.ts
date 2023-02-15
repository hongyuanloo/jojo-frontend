import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { axiosPublic } from "./axiosPublic";

// axios instance to access protected routes
export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 5000, //in ms
});

/** Intercept http request:
 *  - check refreshToken is valid
 *  - check accessToken is valid, if not get new accessToken.
 *  - then update accessToken to bearer token.
 */
axiosJWT.interceptors.request.use(
  async (config) => {
    // get both accessToken and refreshToken
    const refreshToken = getRefreshTokenFromLocalStorage();
    const accessToken = getAccessTokenFromLocalStorage();

    // refreshToken is null or has expired
    if (!refreshToken || isTokenExpired(refreshToken)) return config;

    // accessToken is null or has expired
    if (!accessToken || isTokenExpired(accessToken)) {
      // get new accessToken.
      const newAccessToken = await getNewToken(refreshToken);
      config.headers["authorization"] = "Bearer " + newAccessToken;
      console.log("--new accessToken ok.--");
      return config;
    }

    // accessToken has not expired.
    config.headers["authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// get accessToken from local storage
function getAccessTokenFromLocalStorage(): string | null {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return JSON.parse(accessToken);

  return null;
}

// get refreshToken from local storage
function getRefreshTokenFromLocalStorage(): string | null {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) return JSON.parse(refreshToken);

  return null;
}

// given refreshToken, fetch new accessToken
async function getNewToken(refreshToken: string) {
  const reqHeader = {
    headers: { authorization: "Bearer " + refreshToken },
  };

  try {
    const { data } = await axiosPublic.get(`/auth/access-token`, reqHeader);

    //extract data from response.
    const { accessToken } = data;

    if (accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    }

    return accessToken;
  } catch (error) {
    throw new Error("Fail to get new accessToken.");
  }
}

// check if given token has expired?
function isTokenExpired(token: string): boolean {
  // get current datetime
  const currentDate_ms = Date.now();

  // get token datetime
  const decodedToken_exp_ms = (jwtDecode<JwtPayload>(token).exp ?? 0) * 1000;

  return currentDate_ms > decodedToken_exp_ms;
}
