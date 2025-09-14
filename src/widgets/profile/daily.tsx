import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'

export const Daily = () => {
  return (
    <div className="flex flex-col gap-[11px]">
      <div className="relative flex items-center gap-[15px] overflow-hidden rounded-[25px] bg-[linear-gradient(180deg,#F9FDFF_0%,#F9FDFF_100%),linear-gradient(180deg,#E7EBFF_0%,#EBEDFF_100%),linear-gradient(0deg,#F2F6FF,#F2F6FF)] p-[22px_10px_22px_32px]">
        <div className="flex flex-col gap-[21px] text-[#343434]">
          <div className="text-[14px] leading-[17px] font-[800] text-[#343434]">
            Выполняйте задания и получайте крутые гифты!
          </div>
          <div className="text-[10px] font-[400]">
            Выполнено: <span className="font-[700]">0/10</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[4px]">
          <div className="relative flex h-[79px] w-[76px] items-center justify-center rounded-[20px] bg-[#FB8FFF]">
            <Icons.Question />
            <Icons.SecondStar className="absolute top-[15px] right-[18px] z-10 rotate-[6.88]" />
          </div>
          <Button className="m-auto mt-[8px] h-[25px] min-h-[25px] w-[85px] !rounded-full border bg-[#2B87FE] p-0 text-[8px] leading-[6px] font-[600]">
            Забрать награду
          </Button>
        </div>

        <Icons.DailyBg className="absolute right-0 bottom-[-32px] left-[10px] m-auto" />
      </div>

      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-[25px] bg-[linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,rgba(220,208,255,0.1),rgba(220,208,255,0.1))] p-[10px_20px_9px_21px]"
        >
          <div className="flex items-center gap-[6px]">
            <div className="h-[42px] w-[42px] rounded-[50%] bg-pink-400 object-cover"></div>
            <div className="flex flex-col">
              <div className="text-[14px] leading-[14px] font-[700] text-[#343434]">
                Заголовок
              </div>
              <div className="text-[10px] leading-[12px] font-[400] text-[#343434]">
                Описание
              </div>
            </div>
          </div>
          <div className="flex gap-[7px]">
            <Button className="h-[22px] min-h-[22px] !rounded-full border border-none bg-[#D5C4FF] p-0 p-[0_8px] text-[8px] leading-[6px] font-[600] whitespace-nowrap text-[#856DD2]">
              Начать
            </Button>
            <Button className="h-[22px] min-h-[22px] !rounded-full border bg-[#2B87FE] p-0 p-[0_8px] text-[8px] leading-[6px] font-[600] whitespace-nowrap">
              Проверить
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
