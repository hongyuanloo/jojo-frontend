import { useReduxDispatch } from "../redux/hooks";
import { updateCartItems } from "../redux/slices/cartSlice";
import { updateOrderItems } from "../redux/slices/ordersSlice";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgressLoading } from "../components/ProgressIndicator";
import { Box } from "@mui/material";

export const LogoutPage = () => {
  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();

  // init access to local storage
  const [, , clearAccessTokenLS] = useLocalStorage("accessToken");
  const [, , clearRefreshTokenLS] = useLocalStorage("refreshToken");
  const [, , clearUserLS] = useLocalStorage("user");

  const navigate = useNavigate();

  // reset redux and local storage to default
  function resetStatesToDefault() {
    // reset redux states
    dispatch(updateOrderItems({ ordersItems: [] }));
    dispatch(updateCartItems({ cartItems: [] }));

    // reset local storage states
    clearAccessTokenLS();
    clearRefreshTokenLS();
    clearUserLS();
  }

  useEffect(() => {
    resetStatesToDefault();
    // navigate to homepage.
    navigate("/");

    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      {CircularProgressLoading()}
      <Box>Logging out</Box>
    </Box>
  );
};
