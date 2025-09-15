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
            'bg-text relative flex h-[14vw] w-[14vw] items-center justify-center rounded-[10px] transition-all',
            isSelected && selectedTab === 'shop' && 'ring-[2px] ring-[#2B87FE]',
            isSelected &&
              selectedTab === 'inventory' &&
              'ring-[2px] ring-[#E94DBB]',
          )}
        >
          <div className="text-2xl"></div>
        </div>

        <div className="mt-1 text-center">
          <span
            className={cn(
              'text-text text-xs transition-all',
              isSelected && selectedTab === 'shop' && 'text-[#2B87FE]',
              isSelected && selectedTab === 'inventory' && 'text-[#E94DBB]',
            )}
          >
            40 TON
          </span>
        </div>
      </div>
    )
  }

  const renderInventoryView = () => (
    <div className="flex flex-col items-center gap-[6.2vw]">
      <div
        className={cn(
          'bg-dark-gray-card border-text flex h-[70dvh] w-full flex-col justify-between gap-[2.99vw] rounded-[25px] border p-[5vw_6.5vw_9vw]',
        )}
      >
        {!mockGifts.length && (
          <div className="relative mb-[1.49vw]">
            <div className="text-center text-[3.73vw] font-[500]">
              Инвентарь
            </div>
            <Icons.Close
              className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
              onClick={() => setShowItems(false)}
            />
          </div>
        )}

        {mockGifts.length ? (
          <div className="mt-[2.74vw] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw] overflow-auto px-[0.5vw] pt-[0.5vw]">
            {mockGifts.map((gift) => renderGiftSlot(gift))}
          </div>
        ) : (
          <div className="mt-[2.74vw] text-center text-[3.73vw]">
            У вас нет гифтов
            <br />
            Отправьте на @name
          </div>
        )}

        <div className="m-[0_4.48vw] flex h-[11.7vw] cursor-pointer overflow-hidden rounded-[2005px] bg-[#656565]">
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-[1215px] !text-white',
              selectedTab === 'inventory' && 'bg-[#E94DBB]',
            )}
            onClick={() => setSelectedTab('inventory')}
          >
            Инвентарь
          </div>
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-[1215px] !text-white',
              selectedTab === 'shop' && 'bg-[#03A7FF]',
            )}
            onClick={() => setSelectedTab('shop')}
          >
            Магазин
          </div>
        </div>
      </div>

      {mockGifts.length ? (
        <div className="flex gap-[5.47vw]">
          <Button
            onClick={() => setShowItems(false)}
            className={cn(
              'border-text m-auto h-[11.19vw] w-[34.83vw] !rounded-full border bg-[#2B87FE] text-white',
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
              'border-text m-auto h-[11.19vw] w-[34.83vw] !rounded-full border',
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
            'border-text m-auto h-[11.19vw] w-[34.83vw] !rounded-full border bg-[#2B87FE] text-white',
          )}
        >
          Пополнить
        </Button>
      )}
    </div>
  )

  const upgrade = () => (
    <div className="flex flex-col items-center gap-[6.22vw]">
      <div
        className={cn(
          'bg-dark-gray-card border-text flex h-[70dvh] w-full flex-col gap-[2.99vw] rounded-2xl border p-[5.47vw_6.97vw_8.96vw]',
        )}
      >
        <div className="relative">
          <div className="text-center text-[3.73vw] font-[500]">Улучшение</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={() => setShowUpgrade(false)}
          />
        </div>
        <div className="mt-[2.74vw] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw] overflow-auto pt-[1.49vw]">
          {mockGifts.map((gift) => renderGiftSlot(gift))}
        </div>
      </div>
      <Button
        onClick={() => setShowUpgrade(true)}
        className="mx-auto w-[36.1vw] !rounded-full border bg-[#E94DBB] text-[2.99vw] leading-[2.49vw] font-[600] backdrop-blur-[10.57px]"
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
        <div className="relative top-[-9.95vw] flex flex-col items-center gap-[4.98vw]">
          <CraftCircle showSelectGift={() => setShowItems(true)} />
          <div className="flex flex-col items-center gap-[3.48vw]">
            <div className="text-[3.98vw] leading-[3.98vw] font-[400] text-white">
              Ваши предметы
            </div>
            <BalanceCounter
              className="h-[6.97vw] w-[19.65vw] !border-[#656565] bg-[#262626] !text-[3.61vw]"
              count={0}
            />
          </div>
          <SelectItem showSelectItem={() => setShowItems(true)} />
          <GameHash />
          <Button
            onClick={() => setShowUpgrade(true)}
            className="mx-auto w-[36.1vw] !rounded-full border bg-[#E94DBB] text-[2.99vw] leading-[2.49vw] font-[600] backdrop-blur-[10.57px]"
          >
            Улучшить
          </Button>
        </div>
      )}
    </PageWrapper>
  )
}
