"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { wait } from "@/lib/wait";
import { put } from "@vercel/blob";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
                    // if file isn't submitted - ignore this validation
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  // file: fileSchema.refine(file => file.size > 0, "Required"),
  file: fileSchema.optional(),
  image: imageSchema.refine(file => file.size > 0, "Required"),
});

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});


export async function addProduct(prevState: unknown, formData: FormData) {
  // await wait(200);
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('errors', result.error.formErrors)
    return result.error.formErrors.fieldErrors
  }

  const productId = crypto.randomUUID();
  const data = result.data

  const imagePath = `/products/${productId}/image__${data.image.name}`
  const imageBlob = await put(imagePath, data.image, {
    access: 'public',
  });

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: "",
      imageUrl: imageBlob.url,
      imageName: data.image.name
    },
  });

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound();

  let { imageUrl, imageName } = product;
  if (data.image != null && data.image.size > 0) {
    // we uploaded some image, lets replace currently existing one!
    // remove image
    //....
    // add new 1
    imageName = data.image.name;
    imageUrl = imageUrl || `products/${product.id}/${imageName}`;
    console.time("uploadImage");
    const blob = await put(imageUrl, data.image, {
      access: 'public',
    });
    console.timeEnd("uploadImage");
    imageUrl = blob.url;
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: "",
      imageUrl,
      imageName: imageName,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  // TODO wkn delete!!!
  // await fs.unlink(product.filePath)
  // await fs.unlink(`public${product.imagePath}`)

  revalidatePath("/")
  revalidatePath("/products")
}
