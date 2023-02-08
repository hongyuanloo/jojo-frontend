import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Test = () => {
  const navigate = useNavigate();
  const { userAuthInfo, axiosJWT } = useContext(AuthContext); //authContext

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
      <hr></hr>

      <button
        onClick={(e) => {
          navigate("/");
        }}
      >
        --Home--
      </button>
      <button
        onClick={(e) => {
          navigate("/login");
        }}
      >
        --Login--
      </button>
      <button
        onClick={(e) => {
          navigate("/signUp");
        }}
      >
        --signUp--
      </button>

      <button
        onClick={async (e) => {
          try {
            const { data } = await axiosJWT.get("/users");
            console.log("--get /users--", data);
          } catch (error) {
            console.log("---", error);
          }
        }}
      >
        --get /users--
      </button>
    </div>
  );
};
