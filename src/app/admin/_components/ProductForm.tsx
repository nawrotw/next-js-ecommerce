"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, useRef } from "react";
import { formatCurrency } from "@/lib/formattets";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct, updateProduct } from "@/app/admin/_actions/product";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image"

interface ProductFormProps {
  product?: Product | null
}

export const ProductForm = ({ product }: ProductFormProps) => {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

  const inputImageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>();
  const [imageName, setImageName] = useState<string|undefined>(product?.imageName);

  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )

  const handleSubmit = (payload: FormData) => {
    action(payload);
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceInCents(Number(e.target.value) || undefined)
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // No images selected, selection dialog Cancel button pressed
    if (!inputImageRef.current?.files || inputImageRef.current.files.length === 0) {
      setImage(undefined);
      setImageName(product?.imageName);
      return;
    }

    const file = inputImageRef.current.files[0];
    setImage(file);
    setImageName(file.name);
  }

  return <form className='space-y-8' action={handleSubmit}>
    <div className='space-y-2'>
      <Label htmlFor="productName">Product Name</Label>
      <Input id="productName" type="text" name="name" required defaultValue={product?.name || ""}/>
      {error.name && <div className="text-destructive">{error.name}</div>}
    </div>
    <div className='space-y-2'>
      <Label htmlFor="priceInCents">Price in cents</Label>
      <Input
        type="number"
        id="priceInCents"
        name="priceInCents"
        required
        value={priceInCents === undefined ? "" : priceInCents}
        onChange={handlePriceChange}
      />
      <div className='text-muted-foreground'>{formatCurrency((priceInCents || 0) / 100)}</div>
      {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        required
        defaultValue={product?.description}
      />
      {error.description && <div className="text-destructive">{error.description}</div>}
    </div>


    <div className="space-y-2">
      <Label htmlFor="file">File</Label>
      <Input type="file" id="file" name="file" />
      {/*<Input type="file" id="file" name="file" required={product === null}/>*/}
      {product != null && <div className="text-muted-foreground">{product.filePath}</div>}
      {error.file && <div className="text-destructive">{error.file}</div>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="image">Image</Label>
      <Input ref={inputImageRef} type="file" id="image" name="image" required={product === null} onChange={handleImage}/>

      {image &&
        <img
          src={URL.createObjectURL(image)}
          alt="Product image"
          height="400"
          width="400"
        />
      }
      {product != null &&!image && (
        <Image
          src={product.imageUrl}
          height="400"
          width="400"
          alt="Product Image"
        />
      )}
      {imageName && <div className="text-muted-foreground">{imageName}</div>}
      {error.image && <div className="text-destructive">{error.image}</div>}
    </div>


    <SubmitButton/>
  </form>
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
