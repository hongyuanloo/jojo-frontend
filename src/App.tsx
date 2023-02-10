import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SwitchModeButton } from "./components/theme/SwitchModeButton";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
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
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signUp" element={<SignUp />}></Route>
            <Route path="createAccount" element={<>create Account</>}></Route>
            <Route
              path="test"
              element={
                <>
                  <Test />
                  <SwitchModeButton />
                </>
              }
            ></Route>
            {/* <Route path="myEvents" element={<MyEvents />}></Route>
          
      
            <Route path="createEventForm" element={<CreateEventForm />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
