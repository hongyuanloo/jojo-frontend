import { SwitchModeButton } from "./components/theme/SwitchModeButton";
import { ThemeSetup } from "./components/theme/ThemeSetup";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
// import { Button, Typography } from "@mui/material";
// import { TypographyTest } from "../src/styles/example/test";
import { Test } from "./pages/Test";

function App() {
  //   <TypographyTest>yoyo</TypographyTest>
  // <Typography variant="h3">Hello</Typography>

  // <div style={{ color: "pink", border: "2px solid pink" }}>
  //   <div style={{ width: "200px", height: "200px" }}>App Component.</div>
  //   <Button color="primary" variant="contained">
  //     Primary
  //   </Button>
  // </div>

  return (
    <>
      <ThemeSetup>
        <AuthContextProvider>
          <Test />
          <SwitchModeButton />
          <Login />
        </AuthContextProvider>
      </ThemeSetup>
    </>
  );
}

export default App;
