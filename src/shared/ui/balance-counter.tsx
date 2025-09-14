import { Icons } from '@/shared/ui/icons'
import { FC } from 'react'

type BalanceCounterProps = {
  count: number
  className?: string
  onClick?: () => void
}

export const BalanceCounter: FC<BalanceCounterProps> = ({
  count,
  className,
  onClick,
}) => {
  return (
    <div
      className={`flex min-h-[7.46vw] w-[16.17vw] items-center justify-center gap-[0.995vw] rounded-full border border-white text-[4.73vw] font-[400] text-[#F7F7F7] ${className}`}
      onClick={onClick}
    >
      <Icons.BlueTon className={'size-3 h-[3.48vw] w-[3.48vw]'} />
      {count}
    </div>
  )
}
