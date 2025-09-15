import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'

export const Daily = () => {
  return (
    <div className="flex flex-col gap-[2.74vw]">
      <div className="relative flex items-center gap-[3.73vw] overflow-hidden rounded-[25px] bg-[linear-gradient(180deg,#F9FDFF_0%,#F9FDFF_100%),linear-gradient(180deg,#E7EBFF_0%,#EBEDFF_100%),linear-gradient(0deg,#F2F6FF,#F2F6FF)] p-[22px_10px_22px_32px]">
        <div className="flex flex-col gap-[5.22vw] text-[#343434]">
          <div className="text-[3.48vw] leading-[4.23vw] font-[800] text-[#343434]">
            Выполняйте задания и получайте крутые гифты!
          </div>
          <div className="text-[2.49vw] font-[400]">
            Выполнено: <span className="font-[700]">0/10</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[0.995vw]">
          <div className="relative flex h-[19.65vw] w-[18.91vw] items-center justify-center rounded-[20px] bg-[#FB8FFF]">
            <Icons.Question />
            <Icons.SecondStar className="absolute top-[3.73vw] right-[4.48vw] z-10 rotate-[6.88]" />
          </div>
          <Button className="bg-primary m-auto mt-[1.99vw] h-[6.2vw] min-h-[6.2vw] w-[21.1vw] !rounded-full border p-0 text-[1.99vw] leading-[1.49vw] font-[600]">
            Забрать награду
          </Button>
        </div>

        <Icons.DailyBg className="absolute right-0 bottom-[-7.96vw] left-[2.5vw] m-auto" />
        <Icons.DailyStarBg className="absolute top-0 left-0" />
      </div>

      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-[25px] bg-[linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,rgba(220,208,255,0.1),rgba(220,208,255,0.1))] p-[10px_20px_9px_21px]"
        >
          <div className="flex items-center gap-[1.49vw]">
            <div className="h-[10.45vw] w-[10.45vw] rounded-[50%] bg-pink-400 object-cover"></div>
            <div className="flex flex-col">
              <div className="text-[3.48vw] leading-[3.48vw] font-[700] text-[#343434]">
                Заголовок
              </div>
              <div className="text-[2.49vw] leading-[2.99vw] font-[400] text-[#343434]">
                Описание
              </div>
            </div>
          </div>
          <div className="flex gap-[1.74vw]">
            <Button className="h-[5.47vw] min-h-[5.47vw] !rounded-full border border-none bg-[#D5C4FF] p-[0_1.99vw] text-[1.99vw] leading-[1.49vw] font-[600] whitespace-nowrap text-[#856DD2]">
              Начать
            </Button>
            <Button className="bg-primary h-[5.47vw] min-h-[5.47vw] !rounded-full border p-[0_1.99vw] text-[1.99vw] leading-[1.49w] font-[600] whitespace-nowrap">
              Проверить
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
