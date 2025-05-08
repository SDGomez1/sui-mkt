import Footer from "@/components/homePage/Footer";
import ProductGallery from "./ProductGallery";

export default function Page() {
  return (
    <section className="overflow-x-hidden max-w-svw">
      <div className="flex px-4 xl:px-40 flex-col xl:flex-row">
        <ProductGallery />
      </div>
      <Footer />
    </section>
  );
}
