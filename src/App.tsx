import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SwitchModeButton } from "./components/theme/SwitchModeButton";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
// import { Button, Typography } from "@mui/material";
// import { TypographyTest } from "../src/styles/example/test";
import { TestPage } from "./pages/TestPage";

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
            <Route index element={<HomePage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="signUp" element={<SignUpPage />}></Route>
            <Route path="cart" element={<CartPage />}></Route>
            <Route path="createAccount" element={<>create Account</>}></Route>
            <Route
              path="test"
              element={
                <>
                  <TestPage />
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
