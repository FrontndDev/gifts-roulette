import { cn } from '@/shared/libs'
import CatImage from '../../../public/cat.png'
import Image from 'next/image'
import { Icons } from '@/shared/ui/icons'

interface GiftProps {
  activeClass?: string | boolean
  activeClassText?: string | boolean
  onClick?: () => void
}

export const Gift = ({ activeClass, activeClassText, onClick }: GiftProps) => {
  return (
    <div
      className={cn('relative flex cursor-pointer flex-col items-center')}
      onClick={onClick}
    >
      <div
        className={cn(
          'relative flex h-[14.8vw] w-[14.8vw] items-center justify-center overflow-hidden rounded-[10px] transition-all',
          activeClass,
        )}
      >
        <Icons.InfoTitle className="absolute top-[5px] right-[8px]" />
        <Image
          src={CatImage.src}
          alt="Pepe"
          width="100"
          height="100"
          className="object-cover"
        />
      </div>

      <div className="mt-1 text-center">
        <span
          className={cn('text-text text-xs transition-all', activeClassText)}
        >
          40 TON
        </span>
      </div>
    </div>
  )
}
