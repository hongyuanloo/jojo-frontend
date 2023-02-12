import { Box, Stack, Grid } from "@mui/material";
import { TypographyStyled } from "../../styles/cartContainer";
import { BoldTitleStyled } from "../../styles/ordersContainer";

const dateTimeoptions: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Singapore",
};

// interface for order item array
interface IOrderItems {
  ordersItems: IOrderItem[];
}

// interface for single order item
export interface IOrderItem {
  [key: string]: any; // any other properties is allowed too.
  id: string;
  paidAt: Date;
  totalPaid: number;
  totalItems: number;
}

export const OrdersBody = ({ ordersItems }: IOrderItems) => {
  // console.log("ordersItems--", ordersItems);

  return (
    //orders body
    <Box
      sx={{
        px: 2,
        width: { mobile: "100%", tablet: "80%" },
        margin: "auto",
        maxWidth: { mobile: "auto", tablet: "700px" },
      }}
    >
      <hr />

      {/* map through each item of ordersItems  */}
      {ordersItems.map((orderItem) => {
        return (
          <div key={orderItem.id}>
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
                  <TypographyStyled>
                    <BoldTitleStyled>{"Order no. : "}</BoldTitleStyled>
                    {orderItem.id}
                  </TypographyStyled>
                  <TypographyStyled>
                    <BoldTitleStyled>{"Total items : "}</BoldTitleStyled>
                    {orderItem.totalItems}
                  </TypographyStyled>
                  <TypographyStyled>
                    <BoldTitleStyled>{"Paid on : "}</BoldTitleStyled>
                    {new Intl.DateTimeFormat("en-GB", dateTimeoptions).format(
                      orderItem.paidAt
                    )}
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
                <TypographyStyled>
                  <BoldTitleStyled>{"Order Total:"}</BoldTitleStyled>
                </TypographyStyled>

                <TypographyStyled pt={3}>
                  {`SGD ${orderItem.totalPaid}`}
                </TypographyStyled>
              </Grid>
            </Grid>
            <hr />
          </div>
        );
      })}
    </Box>
  );
};
