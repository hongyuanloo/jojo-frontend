import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import { SwitchModeButton } from "../theme/SwitchModeButton";
import {
  LocalGroceryStoreOutlined as LocalGroceryStoreOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  SentimentVerySatisfiedOutlined as SentimentVerySatisfiedOutlinedIcon,
  Menu as MenuIcon,
  HomeRounded as HomeRoundedIcon,
  BugReportRounded as BugReportRoundedIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
} from "@mui/icons-material";
import {
  AppBarStyled,
  IconButtonStyled,
  TypographyStyled,
} from "../../styles/navigationBar";
import { useReduxSelector } from "../../redux/hooks";
import { useLocalStorage } from "../customHooks/useLocalStorage";

export const NavigationBar = () => {
  // for navigation to other routes.
  const navigate = useNavigate();

  // state for drawer to open or close
  const [openDrawer, setOpenDrawer] = useState(false);

  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);

  // get user data from lcoal storage.
  const [LS_getUser] = useLocalStorage("user");

  // user is null if not login.
  const user = LS_getUser();

  // toggle drawer open or close.
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  // calculate total cart items
  function calculateTotalCartItems() {
    let totalItems = 0;

    cartItems.forEach((cartItem) => {
      const { quantity } = cartItem;
      totalItems += quantity;
    });
    return totalItems;
  }

  return (
    // NavigationBar Main container.
    <AppBarStyled>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Container: Logo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* onClick: navigate to "/" aka home */}
          <IconButtonStyled onClick={() => navigate("/")}>
            <SentimentVerySatisfiedOutlinedIcon
              sx={{
                fontSize: { mobile: "2rem", tablet: "2.5rem" },
              }}
            />
          </IconButtonStyled>
          <TypographyStyled>Jojo</TypographyStyled>
        </Box>

        {/* Right Container: Light mode, Login, Cart, Drawer*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SwitchModeButton />

          {/* onClick: navigate to "/login" */}
          <IconButtonStyled onClick={() => navigate("/login")}>
            <PersonOutlinedIcon
              sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" } }}
            />
          </IconButtonStyled>

          {/* onClick: navigate to "/cart" */}
          <IconButtonStyled onClick={() => navigate("/cart")}>
            <Badge badgeContent={calculateTotalCartItems()} color="secondary">
              <LocalGroceryStoreOutlinedIcon
                sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" } }}
              />
            </Badge>
          </IconButtonStyled>

          {/* onClick: open drawer from left */}
          <IconButtonStyled onClick={toggleDrawer}>
            <MenuIcon
              sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" } }}
            />
          </IconButtonStyled>

          {/* drawer container */}
          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
            <List>
              {/* Home item */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer();
                    navigate("/");
                  }}
                >
                  {/* Home icon */}
                  <ListItemIcon>
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  {/* Home text */}
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              {/* hide Login item if user is login */}
              {!user && (
                // Login item
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      toggleDrawer();
                      navigate("/login");
                    }}
                  >
                    {/* Login icon */}
                    <ListItemIcon>
                      <PersonOutlinedIcon />
                    </ListItemIcon>
                    {/* Login text */}
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              )}

              {/* hide Sign Up item if user is login */}
              {!user && (
                // Sign Up item
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      toggleDrawer();
                      navigate("/signup");
                    }}
                  >
                    {/* Sign Up icon */}
                    <ListItemIcon>
                      <PersonOutlinedIcon />
                    </ListItemIcon>
                    {/* Sign Up text */}
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              )}

              {/* hide logout item if user not login */}
              {user && (
                // Logout item
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      toggleDrawer();
                      navigate("/logout");
                    }}
                  >
                    {/* logout icon */}
                    <ListItemIcon>
                      <PersonOutlinedIcon />
                    </ListItemIcon>
                    {/* logout text */}
                    <ListItemText primary="Log out" />
                  </ListItemButton>
                </ListItem>
              )}

              {/* My Cart item */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer();
                    navigate("/cart");
                  }}
                >
                  {/* My Cart icon */}
                  <ListItemIcon>
                    <LocalGroceryStoreOutlinedIcon />
                  </ListItemIcon>
                  {/* My Cart text */}
                  <ListItemText primary="My Cart" />
                </ListItemButton>
              </ListItem>

              {/* My Orders item */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer();
                    navigate("/orders");
                  }}
                >
                  {/* My Orders icon */}
                  <ListItemIcon>
                    <LocalMallOutlinedIcon />
                  </ListItemIcon>
                  {/* My Orders text */}
                  <ListItemText primary="My Orders" />
                </ListItemButton>
              </ListItem>

              {/* Test item */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer();
                    navigate("/test");
                  }}
                >
                  {/* Test icon */}
                  <ListItemIcon>
                    <BugReportRoundedIcon />
                  </ListItemIcon>
                  {/* Test text */}
                  <ListItemText primary="Test" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </Box>
      </Box>
    </AppBarStyled>
  );
};
