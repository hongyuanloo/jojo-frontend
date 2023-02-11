import { AnnouncementBar } from "../components/AnnouncementBar";
import { CartContainer } from "../components/CartContainer";
import { FooterContainer } from "../components/FooterContainer";
import { NavigationBar } from "../components/NavigationBar";

export const CartPage = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <CartContainer />
      <hr />
      <FooterContainer />
    </div>
  );
};
