'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string },
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <span className='text-3xl text-red-500'>Something went wrong!</span>
      <pre className='text-red-600 my-8'>Error: {error.message}</pre>
      <span>Try refresh the page or </span>
      <Button variant='outline' onClick={reset}>Retry</Button>
    </div>
  )
}
