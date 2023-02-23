import { AnnouncementBar } from "../components/AnnouncementBar";
import { CarouselContainer } from "../components/CarouselContainer";
import { CategoriesContainer } from "../components/CategoriesContainer";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";
import { ProductsContainer } from "../components/ProductsContainer";

export const HomePage = () => {
  return (
    <div>
      <AnnouncementBar />
      <NavigationBar />
      <CarouselContainer />
      <CategoriesContainer />
      <hr />
      <ProductsContainer />
      <Footer />
    </div>
  );
};
