import {
  FooterContainer,
  FooterLink,
  FooterText,
  FooterTitle,
  GridItemContainer,
  ListContainer,
  AboutUsText,
} from "../../styles/footer";
import { Box, Grid, ListItemText, IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { customColors } from "../../themes/customColors";

export function Footer() {
  return (
    <FooterContainer>
      <Grid container spacing={0} justifyContent="center">
        {/* About Us column */}
        <Grid item tablet={6} sx={{ paddingRight: "8px" }}>
          <FooterTitle>About Us</FooterTitle>
          <AboutUsText>
            Hello and welcome to <strong>Jojo</strong>, the place to find the
            best Shoes, Cars, Movies, Albums and Books for every taste and
            occasion. We thoroughly check the quality of our goods, working only
            with reliable suppliers so that you only receive the best quality
            product.
            <br></br>
            <br></br>
            We at <strong>Jojo</strong> believe in high quality and exceptional
            customer service. But most importantly, we believe shopping is a
            right, not a luxury, so we strive to deliver the best products at
            the most affordable prices, and ship them to you regardless of where
            you are located.
          </AboutUsText>
        </Grid>

        {/* My Account column */}
        <GridItemContainer item mobile={6} tablet={3}>
          <FooterTitle>My Account</FooterTitle>
          <ListContainer>
            <ListItemText>
              <FooterLink to="/">
                <FooterText>Home</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/login">
                <FooterText>Login</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/signup">
                <FooterText>Sign Up</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/cart">
                <FooterText>My Cart</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/orders">
                <FooterText>My Orders</FooterText>
              </FooterLink>
            </ListItemText>
          </ListContainer>
        </GridItemContainer>

        {/* "Follow us on" column */}
        <GridItemContainer
          item
          mobile={6}
          tablet={3}
          style={{
            borderStyle: "solid",
            borderColor: customColors.light_greyish,
            borderWidth: 4,
          }}
        >
          <FooterTitle>Follow us on</FooterTitle>
          <ListContainer>
            <ListItemText>
              <Box
                sx={{
                  my: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  aria-label="Hong Yuan's GitHub Url"
                  href="https://github.com/hongyuanloo/jojo-frontend"
                  style={{ color: customColors.light_greyish }}
                >
                  <GitHubIcon />
                </IconButton>

                <IconButton
                  aria-label="Hong Yuan's LinkedIn Url"
                  href="https://www.linkedin.com/in/hongyuan-loo/"
                  style={{ color: customColors.light_greyish }}
                >
                  <LinkedInIcon />
                </IconButton>

                <Tooltip title="loohongyuan5505@hotmail.com">
                  <IconButton>
                    <EmailIcon style={{ color: customColors.light_greyish }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItemText>
          </ListContainer>
        </GridItemContainer>
      </Grid>
    </FooterContainer>
  );
}
