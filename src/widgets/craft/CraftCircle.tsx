import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { useState } from 'react'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { cn } from '@/shared/libs'

export const CraftCircle = () => {
  const [selectedGifts, setSelectedGifts] = useState<number[]>([1])
  const percent = 93

  return (
    <div className="relative mx-auto flex h-[74.63vw] w-[74.63vw] items-center justify-center overflow-hidden rounded-[50%] border-[1px] border-[#E9E9E9] bg-[#262626]">
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 m-auto w-[calc(100%)] bg-[#E94DBB]',
        )}
        style={{ height: `calc(${percent}% - 2px)` }}
      />
      <div
        className={cn(
          'relative z-10 flex h-[220px] w-[220px] items-center justify-center rounded-[50%] bg-[#1F1F1F] p-[19px]',
          'items-end pb-[17px]',
        )}
      >
        {!selectedGifts.length ? (
          <div className="flex flex-col items-center gap-[14px] text-center text-[16px] leading-[16px] font-[400] text-white">
            Выбрать гифт для улучшения
            <Button className="flex min-h-[35px] w-[35px] items-center justify-center rounded-[15px] border-[1px] border-[#656565] bg-[#262626] p-0">
              <Icons.Plus />
            </Button>
          </div>
        ) : (
          <BalanceCounter
            className="h-[27px] w-[79px] !border-[#656565] bg-[#262626] !text-[14.5px]"
            count={200}
          />
        )}
      </div>
      <div className="text-[15.8px] leading-[15.8px] font-[400] text-[#656565]">
        <div
          className={cn(
            'absolute top-[15px] right-0 left-0 m-auto w-[39px] text-center',
            percent >= 93 && 'text-white',
          )}
        >
          100%
        </div>
        <div
          className={cn(
            'absolute top-0 bottom-0 left-0 m-auto h-fit w-[39px] text-center',
            percent > 50 && 'text-white',
          )}
        >
          50%
        </div>
        <div
          className={cn(
            'absolute top-0 right-0 bottom-0 m-auto h-fit w-[39px] text-center',
            percent > 50 && 'text-white',
          )}
        >
          50%
        </div>
        <div
          className={cn(
            'absolute right-0 bottom-[15px] left-0 m-auto w-[39px] text-center',
            percent > 7 && 'text-white',
          )}
        >
          0%
        </div>
      </div>
    </div>
  )
}
