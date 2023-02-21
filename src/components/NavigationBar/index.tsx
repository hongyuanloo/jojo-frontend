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

export const NavigationBar = () => {
  // for navigation to other routes.
  const navigate = useNavigate();

  // state for drawer to open or close
  const [openDrawer, setOpenDrawer] = useState(false);

  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);

  // list of drawer items and path
  const drawerItems = [
    { name: "Home", path: "/", icon: <HomeRoundedIcon /> },
    { name: "Login", path: "/login", icon: <PersonOutlinedIcon /> },
    { name: "Sign Up", path: "/signup", icon: <PersonOutlinedIcon /> },
    { name: "My Cart", path: "/cart", icon: <LocalGroceryStoreOutlinedIcon /> },
    {
      name: "My Orders",
      path: "/orders",
      icon: <LocalMallOutlinedIcon />,
    },
    { name: "Test", path: "/test", icon: <BugReportRoundedIcon /> },
  ];

  // toggle drawer open or close.
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  // list all drawer items
  function displayDrawerItems() {
    return (
      <List>
        {drawerItems.map((item, index) => {
          const { name, path, icon } = item;
          return (
            <ListItem key={name} disablePadding>
              <ListItemButton
                onClick={() => {
                  toggleDrawer();
                  navigate(path);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>

                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }

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
            {/* display all drawer items */}
            {displayDrawerItems()}
          </Drawer>
        </Box>
      </Box>
    </AppBarStyled>
  );
};
