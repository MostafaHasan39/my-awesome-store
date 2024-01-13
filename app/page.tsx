import ProductsGrid from "@/components/ProductsGrid";
import ProductsCarousel from "@/components/ProductsCarousel";
import { genrateProducts } from "@/lib/productGenerator";
import { IProductsCollection } from "@/types";
import ParallaxHero from "@/components/ParallaxHero";
import CategoriesCollage from "@/components/CategoriesCollage";
import HerosCarousel from "@/components/HerosCarousel";

export default function Home() {
  const trendingProductsCollections: IProductsCollection[] = [
    { id: 1, products: genrateProducts(12), label: "Best Seller" },
    { id: 2, products: genrateProducts(12), label: "Top Rated" },
    { id: 3, products: genrateProducts(12), label: "Sale" },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HerosCarousel />
      <CategoriesCollage />
      <ProductsGrid productsCollections={trendingProductsCollections} />
      <ParallaxHero backgroundUrl="/assets/hero-parallax.webp" />
      <ProductsCarousel
        products={genrateProducts(12)}
        title={"New Arrival Products"}
      />
    </main>
  );
}
