import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'

export const Weekly = () => {
  return (
    <div className="flex flex-col gap-[2.74vw]">
      <div className="relative flex flex-col gap-[2.49vw] overflow-hidden rounded-[25px] bg-[#F2F6FF] p-[6.97vw_11.7vw_24.9vw] text-center">
        <div className="text-[3.48vw] leading-[4.5vw] font-[800] text-[#343434]">
          Выполните 10 заданий за неделю и получите награду!
        </div>
        <div className="text-[2.49vw] leading-[2.49vw] font-[400] text-[#343434]">
          Выполнено: <span className="font-[700]">1/10</span>
        </div>

        <Icons.WeeklyBg className="absolute bottom-[-9.2vw] left-[-14.43vw] rounded-[30px]" />
        <Icons.WeeklyGiftBg className="absolute right-0 bottom-[-6.71vw] left-0 m-auto" />
        <Icons.WeeklyStar className="absolute top-[9.5vw] right-[10.1vw]" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-[25px] bg-[linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,rgba(220,208,255,0.1),rgba(220,208,255,0.1))] p-[5.47vw_6.46vw]"
        >
          <div className="text-[2.99vw] font-[700] text-[#343434]">
            Текст задания
          </div>
          <div className="flex items-center gap-[0.75vw] text-[3.48vw] font-[500] text-[#343434]">
            5/5
            <Icons.CheckMark />
            {/*<Icons.CheckCross />*/}
          </div>
        </div>
      ))}
      <Button className="bg-primary mx-auto mt-[1.49vw] w-[36.07vw] !rounded-full border border-none text-[2.99vw] leading-[2.49vw] font-[600] backdrop-blur-[10.57px]">
        Получить награду
      </Button>
    </div>
  )
}
