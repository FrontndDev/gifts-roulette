import { PageWrapper } from '@/shared/ui/page-wrapper'
import { CraftCircle } from '@/widgets/craft/CraftCircle'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { SelectItem } from '@/widgets/craft/SelectItem'
import { GameHash } from '@/features/home/game-hash'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/libs'
import { useState } from 'react'
import { Icons } from '@/shared/ui/icons'
import { Gift } from '@/shared/api/types'

const mockGifts: Gift[] = Array.from({ length: 16 }, (_, i) => ({
  id: `gift-${i + 1}`,
  name: `Plush Pepe #${1287 + i}`,
  model: 'Red Pepple',
  pattern: 'Firebird',
  background: 'Persimmon',
  rarity: Math.random() > 0.5 ? 2 : 0.5,
}))

export function CraftPage() {
  const [showItems, setShowItems] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'inventory' | 'shop'>(
    'inventory',
  )
  const [selectedGifts, setSelectedGifts] = useState<Set<string>>(new Set())

  const toggleGiftSelection = (giftId: string) => {
    const newSelected = new Set(selectedGifts)
    if (newSelected.has(giftId)) {
      newSelected.delete(giftId)
    } else {
      newSelected.add(giftId)
    }
    setSelectedGifts(newSelected)
  }

  const selectAllGifts = () => {
    const availableGifts = mockGifts.map((g) => g.id)
    if (selectedGifts.size === availableGifts.length) {
      setSelectedGifts(new Set())
    } else {
      setSelectedGifts(new Set(availableGifts))
    }
  }

  const renderGiftSlot = (gift: Gift | null) => {
    const isSelected = gift ? selectedGifts.has(gift.id) : false

    return (
      <div
        key={gift?.id}
        className={cn('relative flex cursor-pointer flex-col items-center')}
        onClick={() => {
          if (gift) {
            toggleGiftSelection(gift.id)
          }
        }}
      >
        <div
          className={cn(
            'bg-text relative flex h-[14.93vw] w-[14.93vw] items-center justify-center rounded-[10px] transition-all',
            isSelected &&
              selectedTab === 'inventory' &&
              'ring-[2px] ring-[#2B87FE]',
            isSelected && selectedTab === 'shop' && 'ring-[2px] ring-[#E94DBB]',
          )}
        >
          <div className="text-2xl"></div>
        </div>

        <div className="mt-1 text-center">
          <span
            className={cn(
              'text-text text-xs transition-all',
              isSelected && selectedTab === 'inventory' && 'text-[#2B87FE]',
              isSelected && selectedTab === 'shop' && 'text-[#E94DBB]',
            )}
          >
            40 TON
          </span>
        </div>
      </div>
    )
  }

  const renderInventoryView = () => (
    <div className="flex flex-col items-center gap-[25px]">
      <div
        className={cn(
          'bg-dark-gray-card border-text flex h-[70dvh] w-full flex-col justify-between gap-[12px] rounded-2xl border p-[22px_28px_36px]',
        )}
      >
        {!mockGifts.length && (
          <div className="relative mb-[6px]">
            <div className="text-center text-[15px] font-[500]">Инвентарь</div>
            <Icons.Close
              className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
              onClick={() => setShowItems(false)}
            />
          </div>
        )}

        {mockGifts.length ? (
          <div className="mt-[11px] flex flex-wrap gap-[2.99vw]">
            {mockGifts.map((gift) => renderGiftSlot(gift))}
          </div>
        ) : (
          <div className="mt-[11px] text-center text-[15px]">
            У вас нет гифтов
            <br />
            Отправьте на @name
          </div>
        )}

        <div className="m-[0_18px] flex h-[47px] cursor-pointer overflow-hidden rounded-[2005px] bg-[#656565]">
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-[1215px]',
              selectedTab === 'inventory' && 'bg-[#E94DBB]',
            )}
            onClick={() => setSelectedTab('inventory')}
          >
            Инвентарь
          </div>
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-[1215px]',
              selectedTab === 'shop' && 'bg-[#03A7FF]',
            )}
            onClick={() => setSelectedTab('shop')}
          >
            Магазин
          </div>
        </div>
      </div>

      {mockGifts.length ? (
        <div className="flex gap-[22px]">
          <Button
            className={cn(
              'border-text m-auto h-[45px] w-[140px] !rounded-full border bg-[#2B87FE] text-white',
              selectedGifts.size > 0
                ? '!bg-[#2B87FE] text-white'
                : 'border-[#656565] !bg-[#262626] text-[#656565]',
            )}
            isDisabled={selectedGifts.size === 0}
          >
            Добавить
          </Button>
          <Button
            className={cn(
              'border-text m-auto h-[45px] w-[140px] !rounded-full border',
              selectedGifts.size > 0
                ? '!bg-[#F7F7F7] text-[#262626]'
                : 'border-[#656565] !bg-[#262626] text-white',
            )}
            onClick={selectAllGifts}
          >
            Выбрать все
          </Button>
        </div>
      ) : (
        <Button
          className={cn(
            'border-text m-auto h-[45px] w-[140px] !rounded-full border bg-[#2B87FE] text-white',
          )}
        >
          Пополнить
        </Button>
      )}
    </div>
  )

  const upgrade = () => (
    <div className="flex flex-col items-center gap-[25px]">
      <div
        className={cn(
          'bg-dark-gray-card border-text flex h-[70dvh] w-full flex-col gap-[12px] rounded-2xl border p-[22px_28px_36px]',
        )}
      >
        <div className="relative mb-[6px]">
          <div className="text-center text-[15px] font-[500]">Улучшение</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={() => setShowUpgrade(false)}
          />
        </div>
        <div className="mt-[11px] flex h-[100%] flex-wrap gap-[2.99vw] overflow-auto">
          {mockGifts.map((gift) => renderGiftSlot(gift))}
        </div>
      </div>
      <Button
        onClick={() => setShowUpgrade(true)}
        className="mx-auto w-[145px] !rounded-full border bg-[#E94DBB] text-[12px] leading-[10px] font-[600] backdrop-blur-[10.57px]"
      >
        Улучшить
      </Button>
    </div>
  )

  return (
    <PageWrapper back={false}>
      {showItems && renderInventoryView()}
      {showUpgrade && upgrade()}
      {!showItems && !showUpgrade && (
        <div className="relative top-[-40px] flex flex-col items-center gap-[20px]">
          <CraftCircle />
          <div className="flex flex-col items-center gap-[14px]">
            <div className="text-[16px] leading-[16px] font-[400] text-white">
              Ваши предметы
            </div>
            <BalanceCounter
              className="h-[28px] w-[79px] !border-[#656565] bg-[#262626] !text-[14.5px]"
              count={0}
            />
          </div>
          <SelectItem />
          <GameHash />
          <Button
            onClick={() => setShowUpgrade(true)}
            className="mx-auto w-[145px] !rounded-full border bg-[#E94DBB] text-[12px] leading-[10px] font-[600] backdrop-blur-[10.57px]"
          >
            Улучшить
          </Button>
        </div>
      )}
    </PageWrapper>
  )
}
