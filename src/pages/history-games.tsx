import { Icons } from '@/shared/ui/icons'
import { GameHash } from '@/features/home/game-hash'
import { router } from 'next/client'
import { useState } from 'react'
import { UserWon } from '@/shared/modals/user-won'

export const HistoryGames = () => {
  const [showUserWon, setShowUserWon] = useState(false)

  return (
    <div className="flex flex-col gap-[20px]">
      {showUserWon && (
        <UserWon setShowUserWon={setShowUserWon} victory={true} />
      )}

      {!showUserWon && (
        <>
          <div className="flex items-center justify-center text-[13px] leading-[16px] font-[500]">
            <div className="flex items-center gap-[7px] pr-[10px]">
              <Icons.Clover />
              По шансу
              <Icons.GoldArrow />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[7px] px-[10px]">
              <Icons.GoldGift />
              По призу
              <Icons.GoldArrow className="rotate-180" />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[7px] pl-[10px]">
              <Icons.GoldClock />
              По дате
              <Icons.GoldArrow className="rotate-180" />
            </div>
          </div>
          <div className="bg-dark-gray-card border-text relative h-[calc(80dvh-50px)] w-full rounded-2xl border p-[7.96vw_6.4vw_5.9vw_6.4vw]">
            <div className="">
              <div className="text-center text-[15px] leading-[19px] font-[500] text-white">
                История игр
              </div>
              <Icons.Close
                className="absolute top-[19px] right-[19px] h-[19px] w-[19px] cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
            <div
              className="mt-[31px] flex h-[calc(80dvh-50px-50px-7.96vw-5.69vw)] flex-col gap-[8px] overflow-auto pb-[1px]"
              onClick={() => setShowUserWon(true)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex justify-between gap-[6px] rounded-[15px] border-[1px] border-[#656565] p-[8px_17px_9px_13px]"
                >
                  <div className="flex flex-col gap-[7px]">
                    <div className="flex items-center gap-[7px] text-[15px] leading-[11px] font-[500] text-[#EDEDED]">
                      <Icons.Ton className="h-[26px] w-[26px] rotate-270" />
                      @durov
                    </div>
                    <div className="flex flex-col gap-[4px] text-[8px] leading-[6px] font-[400]">
                      <GameHash className="mt-[21px] justify-start !text-[8px] leading-[6px]" />
                      <div className="text-white opacity-20">
                        01.01.25 | 10:01
                      </div>
                    </div>
                  </div>
                  <div className="flex max-w-[103px] flex-col justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[4px] text-[13px] leading-[10px] font-[500]">
                        <Icons.BlueTon />
                        100
                      </div>
                      <div className="flex items-center gap-[4px] text-[13px] leading-[10px] font-[500]">
                        <Icons.Clover />
                        10%
                      </div>
                    </div>
                    <div className="flex h-[26px] w-full flex-wrap gap-[1.5px]">
                      <div
                        className={`flex h-[12px] w-[12px] items-center justify-center rounded-[3px] bg-[#656565] text-[5px]`}
                      >
                        <Icons.Bonus />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
