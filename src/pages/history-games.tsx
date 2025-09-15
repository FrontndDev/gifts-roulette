import { Icons } from '@/shared/ui/icons'
import { GameHash } from '@/features/home/game-hash'
import { router } from 'next/client'
import { useState } from 'react'
import { UserWon } from '@/shared/modals/user-won'
import { cn } from '@/shared/libs'
import Image from 'next/image'
import CatImage from '@public/cat.png'

export const HistoryGames = () => {
  const [showUserWon, setShowUserWon] = useState(false)

  return (
    <div className="flex flex-col gap-[4.98vw]">
      {showUserWon && (
        <UserWon setShowUserWon={setShowUserWon} victory={false} />
      )}

      {!showUserWon && (
        <>
          <div className="flex items-center justify-center text-[3.23vw] leading-[3.98vw] font-[500]">
            <div className="flex items-center gap-[1.74vw] pr-[2.49vw] !text-white">
              <Icons.Clover className="h-[20px] w-[20px] [&_path]:!stroke-[#00E990]" />
              По шансу
              <Icons.GoldArrow />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[1.74vw] px-[2.49vw] !text-white">
              <Icons.GoldGift />
              По призу
              <Icons.GoldArrow className="rotate-180" />
            </div>
            <div className="h-[30px] w-[1px] bg-[#636363]" />
            <div className="flex items-center gap-[1.74vw] pl-[2.49vw] !text-white">
              <Icons.GoldClock />
              По дате
              <Icons.GoldArrow className="rotate-180" />
            </div>
          </div>
          <div className="bg-dark-gray-card relative w-full rounded-[25px] p-[4.2vw_2.5vw_5.5vw_2.5vw]">
            <div>
              <div className="text-center text-[3.73vw] leading-[4.73vw] font-[500] text-white">
                История игр
              </div>
              <Icons.Close
                className="absolute top-[4.73vw] right-[4.73vw] h-[19px] w-[19px] cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
            <div
              className="mt-[22px] flex h-[calc(80dvh-50px-50px-7.96vw-5.69vw)] flex-col gap-[1.99vw] overflow-auto pb-[1px]"
              onClick={() => setShowUserWon(true)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex h-fit justify-between gap-[1.49vw] rounded-[15px] border-[1px] border-[#656565] p-[1.99vw_4.23vw_2.24vw_3.23vw]"
                >
                  <div className="flex flex-col gap-[1.74vw]">
                    <div className="flex items-center gap-[1.74vw] text-[3.73vw] leading-[2.74vw] font-[500] text-[#EDEDED]">
                      <Icons.Ton className="h-[6.47vw] w-[6.47vw] rotate-270" />
                      @durov
                    </div>
                    <div className="flex flex-col gap-[4px] text-[1.99vw] leading-[6px] font-[400]">
                      <GameHash className="mt-[0.5vw] justify-start !text-[1.99vw] leading-[1.49vw]" />
                      <div className="text-white opacity-20">
                        01.01.25 | 10:01
                      </div>
                    </div>
                  </div>
                  <div className="flex max-w-[25.62vw] flex-col justify-between">
                    <div className="flex items-center gap-[2.99vw]">
                      <div className="flex items-center gap-[1vw] text-[3.23vw] leading-[2.49vw] font-[500] !text-white">
                        <Icons.BlueTon className="h-[13px] w-[13px]" />
                        100
                      </div>
                      <div className="flex items-center gap-[1vw] text-[3.23vw] leading-[2.49vw] font-[500] !text-white">
                        <Icons.Clover />
                        10%
                      </div>
                    </div>
                    <div className="flex h-[6.5vw] w-[103px] flex-wrap gap-[0.37vw]">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                        (i, idx) => (
                          <div
                            key={i}
                            className={cn(
                              `flex h-[2.99vw] w-[2.99vw] items-center justify-center overflow-hidden rounded-[2.5px] bg-[#656565] text-[5px] leading-1`,
                              // idx !== 13 && 'opacity-0',
                            )}
                          >
                            {idx !== 13 ? (
                              <Image
                                src={CatImage.src}
                                alt="Cat"
                                width="14"
                                height="14"
                                className="object-cover"
                              />
                            ) : (
                              <div>+70</div>
                            )}
                            {/*<Icons.Bonus />*/}
                          </div>
                        ),
                      )}
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
