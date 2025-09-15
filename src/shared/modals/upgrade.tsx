import { cn } from '@/shared/libs'
import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'
import { GiftI } from '@/shared/api/types'
import { Gift } from '@/shared/ui/gift'
import { useState } from 'react'

const mockGifts: GiftI[] = Array.from({ length: 16 }, (_, i) => ({
  id: `gift-${i + 1}`,
  name: `Plush Pepe #${1287 + i}`,
  model: 'Red Pepple',
  pattern: 'Firebird',
  background: 'Persimmon',
  rarity: Math.random() > 0.5 ? 2 : 0.5,
}))

interface UpgradeProps {
  selectGifts: (v: GiftI) => void
  closeUpgrade: () => void
}

export const Upgrade = ({ selectGifts, closeUpgrade }: UpgradeProps) => {
  const [selectedGift, setSelectedGift] = useState<GiftI | null>(null)

  const renderGiftSlot = (gift: GiftI | null) => {
    const isSelected = gift ? selectedGift?.id === gift.id : false

    return (
      <Gift
        activeClass={cn(isSelected && 'ring-[2px] ring-[#E94DBB]')}
        activeClassText={cn(isSelected && 'text-[#E94DBB]')}
        onClick={() => {
          setSelectedGift(gift)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-[6.22vw]">
      <div
        className={cn(
          'bg-dark-gray-card border-text flex h-[70dvh] w-full flex-col gap-[2.99vw] rounded-2xl border p-[5.47vw_6.47vw_8.96vw]',
        )}
      >
        <div className="relative">
          <div className="text-center text-[3.73vw] font-[500]">Улучшение</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={() => closeUpgrade()}
          />
        </div>
        <div className="mt-[2.74vw] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw] overflow-auto px-[0.5vw] pt-[1.49vw]">
          {mockGifts.map((gift) => renderGiftSlot(gift))}
        </div>
      </div>
      <Button
        onClick={() => selectedGift && selectGifts(selectedGift)}
        className="mx-auto w-[36.1vw] !rounded-full bg-[#E94DBB] text-[2.99vw] leading-[2.49vw] font-[600] backdrop-blur-[10.57px]"
      >
        Улучшить
      </Button>
    </div>
  )
}
