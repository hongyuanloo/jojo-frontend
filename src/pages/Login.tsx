import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Link,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export const Login = () => {
  const errorDefault = {
    status: false,
    code: "",
    message: "",
  };

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(errorDefault);

  //axios.post to authenticate user.
  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const payload = {
      email: input.email,
      password: input.password,
    };

    try {
      // fetch data
      const { data } = await axios.post(
        "http://localhost:8000/v1/auth/login",
        payload
      );

      console.log("--data--", data);
    } catch (err) {
      // error is instanceof AxiosError
      if (err instanceof AxiosError) {
        const response = err.response;

        // console.log("--error--response--", response);
        setError({
          status: true,
          code: response?.status?.toString() ?? "",
          message: response?.data?.error ?? "unknown error.",
        });
      } else {
        // error is not instanceof AxiosError
        setError({
          status: true,
          code: "",
          message: "unknown error.",
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
            <Link href="/createAccount">Create an account.</Link>
          </Typography>

          <Typography variant="body2">
            <Link href="/">Return to store.</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
