import Link from "next/link";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Suspense } from "react";
import { wait } from "@/lib/wait";
import { cache } from "@/lib/cache";

const getMostPopularProducts = cache(async () => {
  await wait(300);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6
  });
}, ['/', 'getMostPopularProducts'], { revalidate: 60 * 60 * 24 });

const getNewestProducts = cache(async () => {
  await wait(500);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6
  });
}, ['/', 'getNewestProducts']);

export default async function Home() {

  return <main className="space-y-8">
    <ProductGridSection title='Most Popular' productFetcher={getMostPopularProducts}/>
    <ProductGridSection title='Newest' productFetcher={getNewestProducts}/>
  </main>;
}

interface ProductGridSectionProps {
  title: string;
  productFetcher: () => Promise<Product[]>;
}

const ProductGridSection = async ({ productFetcher, title }: ProductGridSectionProps) => {

  return <div className="space-y-4">
    <div className="flex gap-4">
      <h2 className='text-3xl font-bold'>{title}</h2>
      <Button variant='outline' asChild>
        <Link href='/products' className='space-x-2'>
          <span>View All</span>
          <ArrowRight className='size-4'/>
        </Link>
      </Button>
    </div>
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <Suspense fallback={<>
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
      </>}>
        <ProductSuspense productFetcher={productFetcher}/>
      </Suspense>
    </div>
  </div>
}

const ProductSuspense = async ({ productFetcher }: { productFetcher: () => Promise<Product[]> }) => {

  const products = await productFetcher();

  return products.map((product) => (
    <ProductCard
      key={product.id}
      {...product}
    />
  ))

}
