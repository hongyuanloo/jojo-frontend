import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../components/customHooks/useLocalStorage";
import { axiosJWT } from "../requestMethods/axiosJWT";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useReduxDispatch } from "../redux/hooks";
import { updateCartItems } from "../redux/slices/cartSlice";

export const CheckoutPage = () => {
  const navigate = useNavigate();

  // init access to local storage
  const [LS_getNewOrder, , LS_clearNewOrder] = useLocalStorage("newOrder");

  // error message for paymentStatus with error
  const [errMessage, setErrMessage] = useState("");

  // state to indicate payment processing status.
  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "success" | "cancel" | "error"
  >("loading");

  // get new order from local storage.
  const newOrder = LS_getNewOrder();

  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();

  // update order by stamping current time to "paidAt"
  async function updateOrderPaidStatus() {
    // stamp current time to paidAt
    const paidAt = new Date().toISOString();

    try {
      // throw error if newOrder.id is null.
      if (!newOrder.id) throw new Error("newOrder id is null.");

      // update order with new time stamp on "paidAt"
      const response = await axiosJWT.put(`/orders/${newOrder.id}`, {
        paidAt,
      });

      // update success, clear newOrder stored in LS.
      if (response.status === 200) {
        setPaymentStatus("success");
      }
    } catch (error) {
      let errMessage: string;
      if (error instanceof Error) errMessage = error.message; //return { error: error.message };
      errMessage = String(error);

      setErrMessage(errMessage);
      setPaymentStatus("error");
    }
  }

  // show payment success UI and remove new order ID from local storage.
  function displayPaymentSuccess() {
    // get new order ID for display.
    const newOrderID = LS_getNewOrder()?.id;
    // remove new order ID from local storage.
    LS_clearNewOrder();

    // update new cartItems to cartItems state
    dispatch(updateCartItems({ cartItems: [] }));

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "400px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* header */}
        <Typography
          sx={{
            mt: 6,
            mb: 2,
            color: "green",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          Payment successful!
        </Typography>

        {/* success logo */}
        <CheckCircleOutlineIcon
          sx={{ fontSize: 88 }}
          color="success"
        ></CheckCircleOutlineIcon>

        {/* payment success message. */}
        <Typography sx={{ py: 1 }}>Your order ID: {newOrderID}</Typography>
        <Typography sx={{ px: 2 }}>
          Your order has been placed. We'll send you an email with your orer
          details.
        </Typography>

        {/* link to view orders. */}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/orders")}
        >
          View my orders
        </Button>
      </Box>
    );
  }

  // show payment cancel UI
  function displayPaymentCancel() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "400px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* header */}
        <Typography
          sx={{
            mt: 6,
            mb: 2,
            color: "red",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          Payment cancelled!
        </Typography>

        {/* cancel logo */}
        <ReportGmailerrorredRoundedIcon
          sx={{ fontSize: 88 }}
          color="error"
        ></ReportGmailerrorredRoundedIcon>

        {/* cancel message */}
        <Typography sx={{ px: 2, pt: 1 }}>
          Payment was cancelled. Your credit card was not charged.
        </Typography>

        {/* link to view orders. */}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/orders")}
        >
          View my orders
        </Button>
      </Box>
    );
  }

  // show loading UI
  function displayLoading() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "400px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* header */}
        <Typography
          sx={{
            mt: 6,
            mb: 2,
            color: "#0288d1",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          Processing Payment...
        </Typography>

        {/* loading logo */}
        <HourglassBottomIcon
          sx={{ fontSize: 88 }}
          color="info"
        ></HourglassBottomIcon>

        {/* loading message */}
        <Typography sx={{ px: 2, pt: 2 }}>
          Please do not refresh or close your browser.
        </Typography>
      </Box>
    );
  }

  // show payment error UI
  function displayPaymentError() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "400px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* header */}
        <Typography
          sx={{
            mt: 6,
            mb: 2,
            color: "red",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          Processing Error!
        </Typography>

        {/* error logo */}
        <ReportGmailerrorredRoundedIcon
          sx={{ fontSize: 88 }}
          color="error"
        ></ReportGmailerrorredRoundedIcon>

        {/* error message */}
        <Typography sx={{ px: 2, pt: 1 }}>Error: {errMessage}</Typography>

        {/* link to home page. */}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          return to Home page
        </Button>
      </Box>
    );
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    // update paidAt with latest timeStamp, and setPaymentStatus to success
    if (query.get("success")) {
      updateOrderPaidStatus();
      return;
    }

    // setPaymentStatus to cancel
    if (query.get("canceled")) {
      setPaymentStatus("cancel");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {/* loading */}
      {paymentStatus === "loading" && displayLoading()}
      {/* success */}
      {paymentStatus === "success" && displayPaymentSuccess()}
      {/* cancel */}
      {paymentStatus === "cancel" && displayPaymentCancel()}
      {/* error */}
      {paymentStatus === "error" && displayPaymentError()}
    </Box>
  );
};
