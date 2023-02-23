import { AnnouncementBar } from "../components/AnnouncementBar";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";
import { OrdersContainer } from "../components/OrdersContainer";

export const OrdersPage = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <OrdersContainer />
      <Footer />
    </div>
  );
};
