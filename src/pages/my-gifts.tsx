import { useState } from 'react'
import { PageWrapper } from '@/shared/ui/page-wrapper'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/libs'
import { Modal, ModalContent } from '@/shared/ui/modal'

interface Gift {
  id: string
  name: string
  model: string
  pattern: string
  background: string
  rarity: number
}

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
            'bg-text relative flex h-[14.93vw] w-[14.93vw] items-center justify-center rounded-[10px] transition-all',
            isSelected && 'ring-[2px] ring-[#2B87FE]',
          )}
        >
          <div className="text-2xl"></div>
        </div>

        <div className="mt-1 text-center">
          <span
            className={cn(
              'text-text text-xs transition-all',
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
      <div className="bg-dark-gray-card border-text h-[80dvh] w-full rounded-2xl border p-[5.69vw_6.4vw]">
        <div className="flex flex-wrap gap-[2.99vw]">
          {mockGifts.map((gift) => renderGiftSlot(gift))}
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="mt-[20px] flex gap-3 px-3">
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
    <div className="flex flex-col items-center gap-[20px]">
      <div className="bg-dark-gray-card border-text flex h-[80dvh] w-full flex-col gap-[12px] rounded-2xl border p-[5.21vw_6.64vw_11.85vw]">
        <div className="relative mb-[6px]">
          <div className="text-center text-[15px] font-[500]">Вывод</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setCurrentView('gifts')}
          >
            <foreignObject
              x="-12.2333"
              y="-12.2333"
              width="43.4666"
              height="43.4666"
            >
              <div xmlns="http://www.w3.org/1999/xhtml"></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="12.2333">
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="#252525"
                fill-opacity="0.1"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="white"
                fill-opacity="0.6"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="url(#paint0_linear_1_11108)"
                fill-opacity="0.2"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="#656565"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_1_11108_clip_path"
                transform="translate(12.2333 12.2333)"
              >
                <path d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_1_11108"
                x1="0.889819"
                y1="6.54038"
                x2="7.17911"
                y2="10.9641"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop
                  offset="0.562572"
                  stop-color="white"
                  stop-opacity="0.17"
                />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {[1, 2, 3].map((i, idx) => (
          <div
            key={i}
            className="flex w-full flex-col gap-[10px] rounded-[25px] border-[1px] border-[#656565] px-[4.97vw] pt-[3.08vw] pb-[2.37vw]"
          >
            <div className="flex h-[69px] w-[57.06vw] items-center justify-end">
              <div
                key={idx}
                className="w-[141px] text-left text-[16px] font-[500]"
              >
                Plush Pepe #1287
              </div>
            </div>

            <div className="flex w-full gap-[12px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex w-full flex-col items-center justify-center rounded-[11px] border-[1px] border-[#656565] bg-[#1A1A1A] py-[7px]"
                >
                  <div className="text-[10px] font-[300] text-[#979797]">
                    Фон
                  </div>
                  <div className="text-[12px] font-[400] text-[#FFFFFF]">
                    Red people
                  </div>
                  <div className="text-[10px] font-[500] text-[#EF8F00]">
                    1.5%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-[11px] text-center text-[15px]">
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
    <div className="flex flex-col items-center gap-[20px]">
      <div className="bg-dark-gray-card border-text flex h-[80dvh] w-full flex-col justify-between gap-[12px] rounded-2xl border p-[5.21vw_3.55vw_11.85vw]">
        <div className="relative mb-[6px]">
          <div className="text-center text-[15px] font-[500]">Инвентарь</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setCurrentView('gifts')}
          >
            <foreignObject
              x="-12.2333"
              y="-12.2333"
              width="43.4666"
              height="43.4666"
            >
              <div xmlns="http://www.w3.org/1999/xhtml"></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="12.2333">
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="#252525"
                fill-opacity="0.1"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="white"
                fill-opacity="0.6"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="url(#paint0_linear_1_11108)"
                fill-opacity="0.2"
              />
              <path
                d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z"
                fill="#656565"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_1_11108_clip_path"
                transform="translate(12.2333 12.2333)"
              >
                <path d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0ZM13.7256 5.2002C13.3689 4.84385 12.7912 4.84368 12.4346 5.2002L9.46289 8.1709L6.49219 5.2002C6.13546 4.84347 5.55692 4.84347 5.2002 5.2002C4.84347 5.55692 4.84347 6.13546 5.2002 6.49219L8.1709 9.46289L5.2002 12.4346C4.84371 12.7913 4.84355 13.3699 5.2002 13.7266C5.55693 14.0832 6.1355 14.0823 6.49219 13.7256L9.46289 10.7539L12.4346 13.7256C12.7913 14.0823 13.3698 14.0833 13.7266 13.7266C14.0833 13.3698 14.0823 12.7913 13.7256 12.4346L10.7539 9.46289L13.7256 6.49219C14.0823 6.13546 14.0823 5.55692 13.7256 5.2002Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_1_11108"
                x1="0.889819"
                y1="6.54038"
                x2="7.17911"
                y2="10.9641"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop
                  offset="0.562572"
                  stop-color="white"
                  stop-opacity="0.17"
                />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mt-[11px] text-center text-[15px]">
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
