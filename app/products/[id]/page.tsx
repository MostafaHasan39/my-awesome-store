import ProductDetails from "@/components/ProductDetails";
import { getProduct } from "@/lib/api";
import { genrateProducts } from "@/lib/productGenerator";
import ProductsCarousel from "@/components/ProductsCarousel";
import { redirect } from "next/navigation";

export default async function PDP({ params }: { params: { id: string } }) {
  let product;
  try {
    product = await getProduct(params.id);
  } catch (error) {
    // Log error to logging service then redirect to 404 page
    redirect("/404");
  }
  const recommendedProducts = genrateProducts(12);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {product && <ProductDetails product={product} />}
      <ProductsCarousel
        products={recommendedProducts}
        title={"You might also like"}
      />
    </main>
  );
}
