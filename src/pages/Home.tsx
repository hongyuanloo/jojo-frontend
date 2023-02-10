import { AnnouncementBar } from "../components/AnnouncementBar";
import { CarouselContainer } from "../components/CarouselContainer";
import { CategoriesContainer } from "../components/CategoriesContainer";
import { FooterContainer } from "../components/FooterContainer";
import { NavigationBar } from "../components/NavigationBar";
import { ProductsContainer } from "../components/ProductsContainer";

export const Home = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <CarouselContainer />
      <CategoriesContainer />
      <ProductsContainer />
      <FooterContainer />
    </div>
  );
};