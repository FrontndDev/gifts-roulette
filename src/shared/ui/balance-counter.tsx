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
      className={`flex min-h-[30px] w-[65px] items-center justify-center gap-[4px] rounded-full border border-white text-[19px] font-[400] text-[#F7F7F7] ${className}`}
      onClick={onClick}
    >
      <Icons.BlueTon className={'size-3 h-[14px] w-[14px]'} />
      {count}
    </div>
  )
}
