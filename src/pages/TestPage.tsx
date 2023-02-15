import { useNavigate } from "react-router-dom";
import { axiosJWT } from "../requestMethods/axiosJWT";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";

export const TestPage = () => {
  const navigate = useNavigate();

  const [getAccessTokenLS] = useLocalStorage("accessToken");
  const [getRefreshTokenLS] = useLocalStorage("refreshToken");
  const [getUserLS] = useLocalStorage("user");

  const accessToken = getAccessTokenLS();
  const refreshToken = getRefreshTokenLS();
  const user = getUserLS();

  return (
    <div>
      <div>---accessToken---'{accessToken}' </div>
      <div>---refreshToken---{refreshToken} </div>
      <div>id:{user?.id} </div>
      <div>
        role: {user?.role},username: {user?.username}
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
