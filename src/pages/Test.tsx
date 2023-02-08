import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Test = () => {
  const { userAuthInfo } = useContext(AuthContext); //authContext

  const { accessToken, refreshToken } = userAuthInfo.tokens;
  const { id, role, username } = userAuthInfo.user;

  return (
    <div>
      <div>---accessToken---'{accessToken}' </div>
      <div>---refreshToken---{refreshToken} </div>
      <div>id:{id} </div>
      <div>
        role: {role},username: {username}{" "}
      </div>

      <button onClick={(e) => {}}></button>
    </div>
  );
};
