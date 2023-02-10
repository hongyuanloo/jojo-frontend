import { Box } from "@mui/material";
import { SwitchModeButton } from "../theme/SwitchModeButton";
import {
  LocalGroceryStoreOutlined as LocalGroceryStoreOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  SentimentVerySatisfiedOutlined as SentimentVerySatisfiedOutlinedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { AppBarStyled, TypographyStyled } from "../../styles/navigationBar";

export const NavigationBar = () => {
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
          <SentimentVerySatisfiedOutlinedIcon
            sx={{
              fontSize: { mobile: "2rem", tablet: "2.5rem" },
            }}
          />
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

          <PersonOutlinedIcon
            sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" } }}
          />
          <LocalGroceryStoreOutlinedIcon
            sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" }, mx: 1 }}
          />
          <MenuIcon sx={{ fontSize: { mobile: "1.75rem", tablet: "2rem" } }} />
        </Box>
      </Box>
    </AppBarStyled>
  );
};
