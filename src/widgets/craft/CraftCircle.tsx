import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { cn } from '@/shared/libs'
import { GiftI } from '@/shared/api/types'
import Image from 'next/image'
import TestImage from '../../../public/big-pepe.png'

export const CraftCircle = ({
  openUpgradeModal,
  selectedGift,
}: {
  openUpgradeModal: (v: boolean) => void
  selectedGift: GiftI | null
}) => {
  const percent = 54

  return (
    <div className="relative mx-auto flex h-[84.3vw] w-[84.3vw] items-center justify-center overflow-hidden rounded-[50%] border-[1px] border-[#E9E9E9] bg-[#181818]">
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 m-auto w-[calc(100%)] bg-[#E94DBB]',
        )}
        style={{ height: `calc(${percent}% - 2px)` }}
      />
      <div
        className={cn(
          'relative z-10 flex h-[64vw] w-[64vw] items-center justify-center rounded-[50%] bg-[#101010] p-[19px]',
          selectedGift && 'h-[unset] w-[unset] items-end p-0',
        )}
      >
        {!selectedGift ? (
          <div className="flex flex-col items-center gap-[14px] text-center text-[4vw] leading-[4vw] font-[400] text-white">
            Выбрать гифт для улучшения
            <Button
              onClick={() => openUpgradeModal(true)}
              className="flex min-h-[35px] w-[35px] items-center justify-center rounded-[15px] bg-[#262626] p-0"
            >
              <Icons.Plus />
            </Button>
          </div>
        ) : (
          <div className="relative h-[64vw] w-[64vw] rounded-[50%] border-[1.2vw] border-[#101010]">
            <Image
              src={TestImage.src}
              alt="Pepe"
              fill
              className="inset-0 z-10 m-auto object-cover"
            />
          </div>
          // <BalanceCounter
          //   className="h-[27px] w-[79px] !border-[#656565] bg-[#262626] !text-[14.5px]"
          //   count={200}
          // />
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
