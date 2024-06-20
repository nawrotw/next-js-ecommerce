import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formattets";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
}

export const ProductCard = (props: ProductCardProps) => {

  const { id, name, description, priceInCents, imagePath } = props

  return <Card className='flex overflow-hidden flex-col'>
    <div className='relative w-full h-auto aspect-video'>
      <Image src={imagePath} alt={name} fill/>
    </div>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{formatCurrency(priceInCents)}</CardDescription>
    </CardHeader>
    <CardContent className='flex-grow'>
      <p className='line-clamp-4'>
        {description}
      </p>
    </CardContent>
    <CardFooter>
      <Button asChild size='lg' className='w-full'>
        <Link href={`/products/${id}/purchase`}>Purchase</Link>
      </Button>
    </CardFooter>
  </Card>
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300"/>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"/>
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"/>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"/>
        <div className="w-full h-4 rounded-full bg-gray-300"/>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"/>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}