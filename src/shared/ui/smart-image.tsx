import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/shared/libs'

type SmartImageProps = Omit<ImageProps, 'onLoad' | 'onError'> & {
  fallback?: React.ReactNode
  containerClassName?: string
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  fallback = null,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white/5',
        containerClassName,
        !loaded && 'animate-pulse',
      )}
      style={{ width, height }}
    >
      {!error && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'absolute inset-0 transition-opacity duration-500 ease-in-out',
            className,
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setError(true)}
          {...rest}
        />
      )}

      {error && fallback && (
        <div className="flex h-full w-full items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  )
}
