import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../requestMethods/axiosPublic";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";

export const LoginPage = () => {
  const errorDefault = {
    status: false,
    code: "",
    message: "",
  };

  const inputDefault = {
    email: "",
    password: "",
  };
  //! For development, use data below.
  // {
  //   email: "loo@gmail.com",
  //   password: "123",
  // }

  // local state for controlled inputs
  const [input, setInput] = useState(inputDefault);

  // local state to handle errors.
  const [error, setError] = useState(errorDefault);

  // init access to local storage
  const [, setAccessTokenLS] = useLocalStorage("accessToken");
  const [, setRefreshTokenLS] = useLocalStorage("refreshToken");
  const [, setUserLS] = useLocalStorage("user");

  const navigate = useNavigate();

  // send login info to login route. If success, update infor into userAuthInfo
  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    //reset error
    setError(errorDefault);

    // payload for login route.
    const payload = {
      email: input.email,
      password: input.password,
    };

    try {
      // fetch data from login route
      const { data } = await axiosPublic.post("/auth/login", payload);

      //extract data from response.
      const { accessToken, refreshToken, user } = data;

      // update data from response to local storage.
      setAccessTokenLS(accessToken);
      setRefreshTokenLS(refreshToken);
      setUserLS(user);

      // reset input.
      setInput(inputDefault);

      navigate("/");
      console.log("--login ok--");
    } catch (err) {
      // error is instanceof AxiosError
      if (err instanceof AxiosError) {
        const response = err.response;
        // console.log("--error--response--", response);
        setError({
          status: true,
          code: response?.status.toString() ?? "unknown",
          message: response?.data.error ?? "unknown error.",
        });
      } else {
        // error is not instanceof AxiosError
        setError({
          status: true,
          code: "unknown",
          message: String(error),
        });
      }
    }
  };

  // handle change to email and password entries.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    //reset error
    setError(errorDefault);

    const name = event.target.name;
    setInput((prev) => ({ ...prev, [name]: event.target.value }));
  };
  // https://github.com/mui/material-ui/blob/v5.11.7/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
  return (
    <Container component="main" maxWidth="tablet">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" pt={4}>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSubmit(event)
          }
          width="90%"
          maxWidth={350}
        >
          <TextField
            margin="normal"
            fullWidth
            required
            //   size="small"
            type="email"
            label="Email"
            variant="outlined"
            name="email"
            value={input.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            required
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            value={input.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />

          <Typography variant="body2" sx={{ color: "red" }}>
            {error.status && `${error.code}: ${error.message}`}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ my: 2 }}>
            {`Don't have an account?  `}
            <Link to="/signUp">Create an account.</Link>
          </Typography>

          <Typography variant="body2">
            <Link to="/">Return to Home Page</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
