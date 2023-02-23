import { Box, Stack, Grid } from "@mui/material";
import { useReduxSelector } from "../../redux/hooks";
import { TypographyStyled } from "../../styles/cartContainer";
import { BoldTitleStyled } from "../../styles/ordersContainer";

export const OrdersBody = () => {
  // ordersItems state from redux store
  const ordersItems = useReduxSelector((state) => state.orders.ordersItems);

  // if ISODate is string, format it t "21 February 2023, 10:12:26 pm" and return.
  // if ISODate is string, return.
  function formatDateForDisplay(ISODate: any) {
    const dateTimeoptions: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Singapore",
    };

    if (typeof ISODate === "string") {
      const dateObj = new Date(ISODate);
      const newDateFormat = new Intl.DateTimeFormat(
        "en-GB",
        dateTimeoptions
      ).format(dateObj);

      return newDateFormat;
    }
    return ISODate;
  }

  return (
    //orders body
    <Box
      sx={{
        px: 2,
        pb: 4,
        width: { mobile: "100%", tablet: "80%" },
        margin: "auto",
        maxWidth: { mobile: "auto", tablet: "700px" },
      }}
    >
      <hr />

      {/* map through each item of ordersItems  */}
      {ordersItems.map((orderItem) => {
        return (
          <Box key={orderItem.id}>
            {/* order item container*/}
            <Grid container>
              {/* left side order item */}
              <Grid
                item
                py={1}
                mobile={8}
                tablet={9.5}
                sx={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: { mobile: "column", tablet: "row" },
                }}
              >
                {/* order details - id, totalItems, paidAt */}
                <Stack>
                  <TypographyStyled py={1}>
                    <BoldTitleStyled>{"Order no. : "}</BoldTitleStyled>
                    <br></br>
                    {orderItem.id}
                  </TypographyStyled>
                  <TypographyStyled py={1}>
                    <BoldTitleStyled>{`Paid on : `}</BoldTitleStyled>
                    <br></br>
                    {formatDateForDisplay(orderItem.paidAt) ??
                      "Pending Payment"}
                  </TypographyStyled>
                </Stack>
              </Grid>

              {/* right side order item */}
              <Grid
                item
                py={1}
                mobile={4}
                tablet={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TypographyStyled py={1}>
                  <BoldTitleStyled>{"Order Total:"}</BoldTitleStyled>
                </TypographyStyled>

                <TypographyStyled py={1}>
                  {`SGD ${orderItem.totalPaid}`}
                </TypographyStyled>
              </Grid>
            </Grid>
            <hr />
          </Box>
        );
      })}
    </Box>
  );
};
