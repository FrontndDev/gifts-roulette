import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import Image from 'next/image'
import RocketBg from '../../../public/mission-rocket-bg.png'
import RightBg from '../../../public/mission-right-bg.png'
import PepeBg from '../../../public/mission-pepe-bg.png'

export const Missions = () => {
  return (
    <div className="flex flex-col gap-[2.74vw]">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(180deg,#F9FDFF_0%,#F9FDFF_100%),linear-gradient(180deg,#E7EBFF_0%,#EBEDFF_100%),linear-gradient(0deg,#F2F6FF,#F2F6FF)] p-[3.7vw_6.5vw]"
        >
          <Icons.MissionBg className="absolute bottom-[-3.73vw] left-[-2.99vw]" />
          <Image
            src={RocketBg.src}
            alt="Rocket"
            width="66"
            height="64"
            className="absolute top-[6.5vw] left-0"
          />

          <Image
            src={RightBg.src}
            alt="Rocket"
            width="47"
            height="47"
            className="absolute top-0 right-0"
          />
          <Image
            src={PepeBg.src}
            alt="Rocket"
            width="43"
            height="43"
            className="absolute right-[8px] bottom-[8px]"
          />

          <div className="text-center text-[3.48vw] font-[800] text-black">
            Приключения пепы
          </div>

          <div className="flex flex-col items-center p-[0_1.74vw] pt-[2.99vw]">
            <div className="flex gap-[2vw]">
              <div className="bg-primary relative flex h-[19.65vw] w-[18.9vw] items-center justify-center rounded-[20px]">
                <Icons.Question />
                <Icons.SecondStar className="absolute top-[3.7vw] right-[4.5vw] rotate-[6.88]" />
                <div className="absolute right-0 bottom-0 left-0 m-auto flex h-[5.5vw] w-fit items-center gap-[0.5vw] text-[2.24vw] leading-[3.7vw] font-[600] text-[#F3F3F3]">
                  <Icons.ClearedTon className="h-[1.74vw] w-[1.74vw]" />
                  10
                </div>
              </div>

              <div className="flex w-[35.82vw] flex-col gap-[1.24vw]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-r-[1px] border-b-[1px] border-b-[#DFD8EF] pr-[1.49vw] pb-[1.24vw]"
                  >
                    <div className="text-[2.24vw] leading-[1.64vw] font-[700] text-[#343434]">
                      Текст задания
                    </div>
                    <div className="flex items-center gap-[0.5vw]">
                      <div className="text-[1.99vw] leading-[1.64vw] font-[500] text-[#343434]">
                        5/5
                      </div>
                      <Icons.CheckMark />
                      {/*<Icons.CheckCross />*/}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="bg-primary m-auto mt-[1.99vw] h-[6.22vw] min-h-[6.22vw] w-[21.14vw] !rounded-full border p-0 text-[8px] leading-[6px] font-[600]">
              Забрать награду
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
