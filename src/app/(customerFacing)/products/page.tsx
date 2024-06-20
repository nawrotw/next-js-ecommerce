import { Suspense } from "react";
import { ProductCardSkeleton, ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { wait } from "@/lib/wait";

const getProducts = async (): Promise<Product[]> => {
  await wait(200);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  })
}

export default function ProductsPage() {
  return <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <Suspense fallback={<>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
    </>}>
      <ProductsSuspense/>
    </Suspense>
  </div>
}

const ProductsSuspense = async () => {
  return (await getProducts()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
