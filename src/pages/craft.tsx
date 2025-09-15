import { PageWrapper } from '@/shared/ui/page-wrapper'
import { CraftCircle } from '@/widgets/craft/CraftCircle'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { SelectItem } from '@/widgets/craft/SelectItem'
import { GameHash } from '@/features/home/game-hash'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'
import { Inventory } from '@/shared/modals/inventory'
import { Upgrade } from '@/shared/modals/upgrade'
import { GiftI } from '@/shared/api/types'

export function CraftPage() {
  const [showInventory, setShowInventory] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedGifts, setSelectedGifts] = useState<number[]>([])
  const [selectedGift, setSelectedGift] = useState<GiftI | null>(null)

  return (
    <PageWrapper back={false}>
      {showInventory && (
        <Inventory
          withShop={true}
          closeInventory={() => setShowInventory(false)}
          add={() => setSelectedGifts([1])}
        />
      )}
      {showUpgrade && (
        <Upgrade
          closeUpgrade={() => setShowUpgrade(false)}
          selectGifts={(v) => {
            setSelectedGift(v)
            setShowUpgrade(false)
          }}
        />
      )}
      {!showInventory && !showUpgrade && (
        <div className="relative top-[-9.95vw] flex flex-col items-center gap-[4.98vw]">
          <CraftCircle
            selectedGift={selectedGift}
            openUpgradeModal={() => setShowUpgrade(true)}
          />
          <div className="flex flex-col items-center gap-[3.48vw]">
            <div className="text-[3.98vw] leading-[3.98vw] font-[400] text-white">
              Ваши предметы
            </div>
            <BalanceCounter
              className="h-[6.97vw] w-[19.65vw] !border-[#656565] bg-[#262626] !text-[3.61vw]"
              count={0}
            />
          </div>
          <SelectItem
            selectedGift={selectedGift}
            openInventory={() => setShowInventory(true)}
          />
          <GameHash />
          <Button className="mx-auto w-[36.1vw] !rounded-full bg-[#E94DBB] text-[3.7vw] leading-[2.49vw] font-[600] backdrop-blur-[10.57px]">
            Улучшить
          </Button>
        </div>
      )}
    </PageWrapper>
  )
}
