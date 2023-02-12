import { AnnouncementBar } from "../components/AnnouncementBar";
import { FooterContainer } from "../components/FooterContainer";
import { NavigationBar } from "../components/NavigationBar";
import { OrdersContainer } from "../components/OrdersContainer";

export const OrdersPage = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <OrdersContainer />
      <hr />
      <FooterContainer />
    </div>
  );
};
