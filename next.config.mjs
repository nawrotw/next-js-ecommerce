import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rjcy8brirxf6nlw9.public.blob.vercel-storage.com'],
  },
};

export default nextConfig;
