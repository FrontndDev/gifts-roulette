import { Icons } from '@/shared/ui/icons'
import { GameHash } from '@/features/home/game-hash'
import { router } from 'next/client'
import { useState } from 'react'
import { UserWon } from '@/shared/modals/user-won'

export const HistoryGames = () => {
  const [showUserWon, setShowUserWon] = useState(false)

  return (
    <div className="flex flex-col gap-[4.98vw]">
      {showUserWon && (
        <UserWon setShowUserWon={setShowUserWon} victory={true} />
      )}

      {!showUserWon && (
        <>
          <div className="flex items-center justify-center text-[3.23vw] leading-[3.98vw] font-[500]">
            <div className="flex items-center gap-[1.74vw] pr-[2.49vw]">
              <Icons.Clover />
              По шансу
              <Icons.GoldArrow />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[1.74vw] px-[2.49vw]">
              <Icons.GoldGift />
              По призу
              <Icons.GoldArrow className="rotate-180" />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[1.74vw] pl-[2.49vw]">
              <Icons.GoldClock />
              По дате
              <Icons.GoldArrow className="rotate-180" />
            </div>
          </div>
          <div className="bg-dark-gray-card border-text relative h-[calc(80dvh-50px)] w-full rounded-2xl border p-[7.96vw_6.4vw_5.9vw_6.4vw]">
            <div className="">
              <div className="text-center text-[3.73vw] leading-[4.73vw] font-[500] text-white">
                История игр
              </div>
              <Icons.Close
                className="absolute top-[4.73vw] right-[4.73vw] h-[4.73vw] w-[4.73vw] cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
            <div
              className="mt-[31px] flex h-[calc(80dvh-50px-50px-7.96vw-5.69vw)] flex-col gap-[1.99vw] overflow-auto pb-[1px]"
              onClick={() => setShowUserWon(true)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex justify-between gap-[1.49vw] rounded-[15px] border-[1px] border-[#656565] p-[1.99vw_4.23vw_2.24vw_3.23vw]"
                >
                  <div className="flex flex-col gap-[1.74vw]">
                    <div className="flex items-center gap-[1.74vw] text-[3.73vw] leading-[2.74vw] font-[500] text-[#EDEDED]">
                      <Icons.Ton className="h-[6.47vw] w-[6.47vw] rotate-270" />
                      @durov
                    </div>
                    <div className="flex flex-col gap-[4px] text-[1.99vw] leading-[6px] font-[400]">
                      <GameHash className="mt-[5.22vw] justify-start !text-[1.99vw] leading-[1.49vw]" />
                      <div className="text-white opacity-20">
                        01.01.25 | 10:01
                      </div>
                    </div>
                  </div>
                  <div className="flex max-w-[25.62vw] flex-col justify-between">
                    <div className="flex items-center gap-[2.99vw]">
                      <div className="flex items-center gap-[0.995vw] text-[3.23vw] leading-[2.49vw] font-[500]">
                        <Icons.BlueTon />
                        100
                      </div>
                      <div className="flex items-center gap-[0.995vw] text-[3.23vw] leading-[2.49vw] font-[500]">
                        <Icons.Clover />
                        10%
                      </div>
                    </div>
                    <div className="flex h-[6.47vw] w-full flex-wrap gap-[0.37vw]">
                      <div
                        className={`flex h-[2.99vw] w-[2.99vw] items-center justify-center rounded-[3px] bg-[#656565] text-[1.24vw]`}
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
