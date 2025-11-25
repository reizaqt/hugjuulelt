import Header from "./components/header";
import HeroSection from "./components/heroSection";
import CategorySection from "./components/categorySection";
import solanCover from "../../../assets/solanCover.jpg";
import AboutSection from "./components/aboutSection";
import Footer from "./components/footer";

export default function CustomerPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header className="sticky top-0 z-50" />

      <main className="flex flex-col px-4 md:px-16">
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 md:p-16">
          <div className="md:w-1/2">
            <HeroSection />
          </div>

          <div className="md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
            <img
              src={solanCover}
              alt="Smooth Look"
              className="w-11/12 max-w-lg h-[400px] md:h-[600px] object-cover rounded-t-[50%] shadow-lg"
            />
          </div>
        </div>

        <CategorySection />
        <AboutSection />

      </main>
      
      <Footer />
    </div>
    
  );
}
