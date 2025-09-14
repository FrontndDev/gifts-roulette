import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'

export const Missions = () => {
  return (
    <div className="flex flex-col gap-[11px]">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(180deg,#F9FDFF_0%,#F9FDFF_100%),linear-gradient(180deg,#E7EBFF_0%,#EBEDFF_100%),linear-gradient(0deg,#F2F6FF,#F2F6FF)] p-[15px_26px]"
        >
          <div className="text-center text-[14px] font-[800] text-black">
            Приключения пепы
          </div>

          <div className="flex flex-col items-center p-[0_7px] pt-[12px]">
            <div className="flex gap-[8px]">
              <div className="relative flex h-[79px] w-[76px] items-center justify-center rounded-[20px] bg-[#2B87FE]">
                <Icons.Question />
                <Icons.SecondStar className="absolute top-[15px] right-[18px] rotate-[6.88]" />
                <div className="absolute right-0 bottom-0 left-0 m-auto flex h-[22px] w-fit items-center gap-[2px] text-[9px] leading-[15px] font-[600] text-[#F3F3F3]">
                  <Icons.ClearedTon className="h-[7px] w-[7px]" />
                  10
                </div>
              </div>

              <div className="flex w-[144px] flex-col gap-[5px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-r-[1px] border-b-[1px] border-b-[#DFD8EF] pr-[6px] pb-[5px]"
                  >
                    <div className="text-[9px] leading-[6.6px] font-[700] text-[#343434]">
                      Текст задания
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <div className="text-[8px] leading-[6.6px] font-[500] text-[#343434]">
                        5/5
                      </div>
                      <Icons.CheckMark />
                      {/*<Icons.CheckCross />*/}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="m-auto mt-[8px] h-[25px] min-h-[25px] w-[85px] !rounded-full border bg-[#2B87FE] p-0 text-[8px] leading-[6px] font-[600]">
              Забрать награду
            </Button>
          </div>

          <Icons.MissionBg className="absolute bottom-[-15px] left-[-12px]" />
        </div>
      ))}
    </div>
  )
}
