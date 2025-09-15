import { cn } from '@/shared/libs'
import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'
import { GiftI } from '@/shared/api/types'
import { Gift } from '@/shared/ui/gift'
import { useState } from 'react'
import Image from 'next/image'
import EmptyGiftsBg from '../../../public/empty-gifts.png'

const mockGifts: GiftI[] = Array.from({ length: 16 }, (_, i) => ({
  id: `gift-${i + 1}`,
  name: `Plush Pepe #${1287 + i}`,
  model: 'Red Pepple',
  pattern: 'Firebird',
  background: 'Persimmon',
  rarity: Math.random() > 0.5 ? 2 : 0.5,
}))

interface InventoryProps {
  closeInventory: () => void
  add: () => void
  withShop?: boolean
}

export const Inventory = ({
  withShop = false,
  closeInventory,
  add,
}: InventoryProps) => {
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

  const renderGiftSlot = (gift: GiftI | null) => {
    const isSelected = gift ? selectedGifts.has(gift.id) : false
    const activeClass = () => {
      if (isSelected) {
        if (!withShop) {
          return 'ring-[2px] ring-[#00EF93]'
        }
        switch (selectedTab) {
          case 'inventory':
            return 'ring-[2px] ring-[#E94DBB]'
          case 'shop':
            return 'ring-[2px] ring-primary'
        }
      }
    }

    const activeClassText = () => {
      if (isSelected) {
        if (!withShop) {
          return ''
        }
        switch (selectedTab) {
          case 'inventory':
            return 'text-[#E94DBB]'
          case 'shop':
            return 'text-primary'
        }
      }
    }

    return (
      <Gift
        activeClass={activeClass()}
        activeClassText={activeClassText()}
        onClick={() => {
          if (gift) {
            toggleGiftSelection(gift.id)
          }
        }}
      />
    )
  }

  const selectAllGifts = () => {
    const availableGifts = mockGifts.map((g) => g.id)
    if (selectedGifts.size === availableGifts.length) {
      setSelectedGifts(new Set())
    } else {
      setSelectedGifts(new Set(availableGifts))
    }
  }

  return (
    <div className="flex flex-col items-center gap-[6.2vw]">
      <div
        className={cn(
          'bg-dark-gray-card relative flex h-[70dvh] w-full flex-col justify-between gap-[2.99vw] rounded-[25px] p-[5vw_6.5vw_5.2vw]',
        )}
      >
        {/*{!mockGifts.length && (*/}
        <div className="relative mb-[1.49vw]">
          <div className="text-center text-[3.73vw] font-[500]">Инвентарь</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={closeInventory}
          />
        </div>
        {/*)}*/}

        {mockGifts.length ? (
          <div className="mt-[2.74vw] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw] overflow-auto px-[0.5vw] pt-[0.5vw]">
            {mockGifts.map((gift) => renderGiftSlot(gift))}
          </div>
        ) : (
          <div className="absolute inset-0 z-1 m-auto flex h-fit flex-col items-center gap-[15px]">
            <div className="relative h-[105px] w-[164px]">
              <Image
                src={EmptyGiftsBg.src}
                alt="empty-gifts"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-[2.74vw] text-center text-[3.73vw]">
              У вас нет гифтов
              <br />
              Отправьте на @name
            </div>
          </div>
        )}

        {withShop && (
          <div className="flex !h-[11.7vw] cursor-pointer overflow-hidden rounded-[2005px] bg-[#141414]">
            <div
              className={cn(
                'flex h-full w-full items-center justify-center rounded-[1215px] !text-white',
                selectedTab === 'inventory'
                  ? 'bg-[#E94DBB]'
                  : '!text-[#4A4A4A]',
              )}
              onClick={() => setSelectedTab('inventory')}
            >
              Инвентарь
            </div>
            <div
              className={cn(
                'flex h-full w-full items-center justify-center rounded-[1215px] !text-white',
                selectedTab === 'shop' ? 'bg-[#03A7FF]' : '!text-[#4A4A4A]',
              )}
              onClick={() => setSelectedTab('shop')}
            >
              Магазин
            </div>
          </div>
        )}
      </div>

      {mockGifts.length ? (
        <div className="flex gap-[5.47vw]">
          <Button
            onClick={add}
            className={cn(
              'w-[39.8vw] gap-0 !rounded-full p-0 text-[15px] leading-[0.5] font-[600]',
              !selectedGifts.size &&
                'border-[#656565] !bg-[#262626] text-[#656565]',
              selectedTab === 'inventory' &&
                selectedGifts.size &&
                '!bg-[#E94DBB] text-white',
              !withShop && selectedGifts.size && '!bg-[#00EF93] text-black',
            )}
            isDisabled={!selectedGifts.size}
          >
            {!withShop && (
              <Icons.Gift
                className={cn(
                  'h-[25px] w-[25px]',
                  selectedGifts.size > 0
                    ? '[&_path]:stroke-black'
                    : '[&_path]:stroke-[#656565]',
                )}
              />
            )}
            Добавить {!withShop && <>Гифт</>}
          </Button>
          <Button
            className={cn(
              'border-text m-auto h-[11.19vw] w-[34.83vw] !rounded-full',
              selectedGifts.size
                ? '!bg-[#F7F7F7] text-[#262626]'
                : '!bg-[#262626] text-white',
            )}
            onClick={selectAllGifts}
          >
            Выбрать все
          </Button>
        </div>
      ) : (
        <Button
          className={cn(
            'border-text bg-primary m-auto h-[11.19vw] w-[39.8vw] !rounded-full text-black',
          )}
        >
          Пополнить
        </Button>
      )}
    </div>
  )
}
