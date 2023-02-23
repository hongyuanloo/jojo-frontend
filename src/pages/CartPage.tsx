import { AnnouncementBar } from "../components/AnnouncementBar";
import { CartContainer } from "../components/CartContainer";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";

export const CartPage = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <CartContainer />
      <Footer />
    </div>
  );
};
