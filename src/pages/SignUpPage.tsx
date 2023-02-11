import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { AxiosError, HttpStatusCode } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../requestMethods/axiosPublic";

export const SignUpPage = () => {
  const errorDefault = {
    status: false,
    code: "",
    message: "",
  };

  const inputDefault = {
    username: "john",
    email: "john@gmail.com",
    password: "123",
  }; //TODO for developement only. reset all field to ""

  // local state for controlled inputs
  const [input, setInput] = useState(inputDefault);

  // local state to handle errors.
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  // send login info to login route. If success, update infor into userAuthInfo
  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    //reset error
    setError(errorDefault);

    // payload for sign up route.
    const payload = {
      email: input.email,
      password: input.password,
      username: input.username,
    };

    try {
      // fetch data from login route
      const { status } = await axiosPublic.post("/users", payload);

      if (status === HttpStatusCode.Created) {
        // reset input.
        setInput(inputDefault);

        console.log("--sign up ok--");
        // TODO modal to show account has created.
        return navigate("/login");
      }
    } catch (err) {
      // error is instanceof AxiosError
      if (err instanceof AxiosError) {
        const response = err.response;
        console.log("--error--response--", response);
        setError({
          status: true,
          code: response?.statusText.toString() ?? "unknown",
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
          Create Account
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
            type="username"
            label="Username"
            variant="outlined"
            name="username"
            value={input.username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            required
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

          <Typography variant="caption" component="p" sx={{ mt: 2 }}>
            By signing up, I agree to the Jojo's Terms of Service, Privacy
            Policy and Refund Policy.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 1, mb: 1 }}
          >
            Create
          </Button>

          <Typography variant="body2" sx={{ my: 2 }}>
            {`Already have an account?  `}
            <Link to="/login">Login</Link>
          </Typography>

          <Typography variant="body2">
            <Link to="/">Return to Home Page</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
