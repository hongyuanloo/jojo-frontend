import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OrdersPage } from "./pages/OrdersPage";
import { SignUpPage } from "./pages/SignUpPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LogoutPage } from "./pages/LogoutPage";
// import { TestPage } from "./pages/TestPage";
// import { SwitchModeButton } from "./components/theme/SwitchModeButton";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="signUp" element={<SignUpPage />}></Route>
            <Route path="logout" element={<LogoutPage />}></Route>
            <Route path="cart" element={<CartPage />}></Route>
            <Route path="orders" element={<OrdersPage />}></Route>
            <Route path="checkout" element={<CheckoutPage />}></Route>
            <Route path="createAccount" element={<>create Account</>}></Route>
            {/* <Route
              path="test"
              element={
                <>
                  <TestPage />
                  <SwitchModeButton />
                </>
              }
            ></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
