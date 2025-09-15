import { useState } from 'react'
import { PageWrapper } from '@/shared/ui/page-wrapper'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/libs'
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

type ViewState = 'gifts' | 'withdraw' | 'inventory'

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
            'bg-text relative flex h-[14.8vw] w-[14.8vw] items-center justify-center rounded-[10px] transition-all',
            isSelected && 'ring-[2px] ring-[#2B87FE]',
          )}
        >
          <div className="text-2xl"></div>
        </div>

        <div className="mt-1 text-center">
          <span
            className={cn(
              'text-[2.99vw] leading-[3.23vw] font-[500] transition-all',
              isSelected && 'text-[#2B87FE]',
            )}
          >
            40 TON
          </span>
        </div>
      </div>
    )
  }

  // Основной вид с сеткой подарков
  const renderGiftsView = () => (
    <div className="flex flex-col">
      <div className="bg-dark-gray-card border-text grid max-h-[80dvh] w-full grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw] overflow-y-auto rounded-[25px] border p-[5.69vw_6.4vw]">
        {mockGifts.map((gift) => renderGiftSlot(gift))}
      </div>

      {/* Кнопки управления */}
      <div className="mt-[4.98vw] flex gap-3 px-3">
        <Button
          className={cn(
            'border-text flex-1 !rounded-full border',
            selectedGifts.size > 0
              ? '!bg-[#2B87FE] text-white'
              : 'border-[#656565] !bg-[#262626] text-[#656565]',
          )}
          onClick={handleWithdraw}
          isDisabled={selectedGifts.size === 0}
        >
          Вывод
        </Button>
        <Button
          className="border-text text-text flex-1 !rounded-full border bg-[#262626]"
          onClick={selectAllGifts}
        >
          Выбрать все
        </Button>
      </div>
    </div>
  )

  // Вид вывода
  const renderWithdrawView = () => (
    <div className="flex flex-col items-center gap-[4.98vw]">
      <div className="bg-dark-gray-card border-text flex h-[80dvh] w-full flex-col gap-[2.99vw] rounded-2xl border p-[5.21vw_6.64vw_6.22vw]">
        <div className="relative mb-[1.49vw]">
          <div className="text-center text-[3.73vw] font-[500]">Вывод</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[4.73vw] w-[4.73vw] cursor-pointer"
            onClick={() => setCurrentView('gifts')}
          />
        </div>
        <div className="flex flex-col gap-[2.99vw] overflow-auto">
          {[1, 2, 3].map((i, idx) => (
            <div
              key={i}
              className="flex w-full flex-col gap-[2.49vw] rounded-[25px] border-[1px] border-[#656565] px-[4.97vw] pt-[3.08vw] pb-[3.5vw]"
            >
              <div className="flex h-[17.2vw] w-[57.06vw] items-center justify-end">
                <div
                  key={idx}
                  className="w-[35.07vw] text-left text-[3.98vw] font-[500]"
                >
                  Plush Pepe #1287
                </div>
              </div>

              <div className="flex w-full gap-[2.99vw]">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex w-full flex-col items-center justify-center rounded-[11px] border-[1px] border-[#656565] bg-[#1A1A1A] py-[1.74vw]"
                  >
                    <div className="text-[2.99vw] font-[300] text-[#979797]">
                      Фон
                    </div>
                    <div className="text-[2.99vw] font-[400] text-[#FFFFFF]">
                      Red people
                    </div>
                    <div className="text-[2.49vw] font-[500] text-[#EF8F00]">
                      1.5%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[2.74vw] text-center text-[3.73vw]">
          Потребуется 150 звезд на вывод
        </div>
      </div>
      <Button
        className={cn(
          'border-text m-auto w-fit !rounded-full border border-none bg-[#2B87FE] text-white',
        )}
      >
        Оплата трансфера
      </Button>
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
          'border-text m-auto w-fit !rounded-full border border-none bg-[#2B87FE] text-white',
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
        {currentView === 'withdraw' && renderWithdrawView()}
        {currentView === 'inventory' && renderInventoryView()}
      </div>
    </PageWrapper>
  )
}
