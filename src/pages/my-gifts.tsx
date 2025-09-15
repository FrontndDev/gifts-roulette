import { useState } from 'react'
import { PageWrapper } from '@/shared/ui/page-wrapper'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/libs'
import { Icons } from '@/shared/ui/icons'
import { GiftI } from '@/shared/api/types'
import { Gift } from '@/shared/ui/gift'
import { Conclusion } from '@/shared/modals/conclusion'

const mockGifts: GiftI[] = Array.from({ length: 16 }, (_, i) => ({
  id: `gift-${i + 1}`,
  name: `Plush Pepe #${1287 + i}`,
  model: 'Red Pepple',
  pattern: 'Firebird',
  background: 'Persimmon',
  rarity: Math.random() > 0.5 ? 2 : 0.5,
}))

export type ViewState = 'gifts' | 'withdraw' | 'inventory'

export function MyGiftsPage() {
  const [selectedGifts, setSelectedGifts] = useState<Set<string>>(new Set())
  const [currentView, setCurrentView] = useState<ViewState>('gifts')

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

  const handleWithdraw = () => {
    if (selectedGifts.size > 0) {
      setCurrentView('withdraw')
    }
  }

  const handlePayTransfer = () => {
    setCurrentView('gifts')
    setSelectedGifts(new Set())
  }

  const renderGiftSlot = (gift: GiftI | null) => {
    const isSelected = gift ? selectedGifts.has(gift.id) : false

    return (
      <Gift
        activeClass={isSelected && 'ring-[2px] ring-primary'}
        activeClassText={isSelected && 'text-primary'}
        onClick={() => {
          if (gift) {
            toggleGiftSelection(gift.id)
          }
        }}
      />
    )
  }

  // Основной вид с сеткой подарков
  const renderGiftsView = () => (
    <div className="flex flex-col">
      <div className="bg-dark-gray-card h-[80dvh] w-full overflow-y-auto rounded-[25px] p-[5.69vw_6.4vw]">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw]">
          {mockGifts.map((gift) => renderGiftSlot(gift))}
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="mt-[25px] flex h-[45px] justify-center gap-[20px]">
        <Button
          className={cn(
            'w-[140px] !rounded-full',
            selectedGifts.size > 0
              ? '!bg-primary text-black'
              : 'border-[#656565] !bg-[#262626] text-[#656565]',
          )}
          onClick={handleWithdraw}
          isDisabled={selectedGifts.size === 0}
        >
          Вывод
        </Button>
        <Button
          className={cn(
            'text-text w-[140px] !rounded-full bg-[#262626]',
            selectedGifts.size && 'bg-white text-black',
          )}
          onClick={selectAllGifts}
        >
          Выбрать все
        </Button>
      </div>
    </div>
  )

  // Вид пустого инвентаря
  const renderInventoryView = () => (
    <div className="flex flex-col items-center gap-[4.98vw]">
      <div className="bg-dark-gray-card border-text flex h-[80dvh] w-full flex-col justify-between gap-[2.99vw] rounded-2xl border p-[5.21vw_3.55vw_11.85vw]">
        <div className="relative mb-[1.49vw]">
          <div className="text-center text-[3.73vw] font-[500]">Инвентарь</div>
          <Icons.Close
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setCurrentView('gifts')}
          />
        </div>

        <div className="mt-[2.74vw] text-center text-[3.73vw]">
          У вас нет гифтов
          <br />
          Отправьте на @name
        </div>
      </div>
      <Button
        className={cn(
          'border-text bg-primary m-auto w-fit !rounded-full border border-none text-white',
        )}
      >
        Пополнить
      </Button>
    </div>
  )

  return (
    <PageWrapper back={false}>
      <div className="text-white">
        {currentView === 'gifts' && renderGiftsView()}
        {currentView === 'withdraw' && (
          <Conclusion setCurrentView={setCurrentView} />
        )}
        {currentView === 'inventory' && renderInventoryView()}
      </div>
    </PageWrapper>
  )
}
