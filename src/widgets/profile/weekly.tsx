import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'

export const Weekly = () => {
  return (
    <div className="flex flex-col gap-[11px]">
      <div className="relative flex flex-col gap-[10px] overflow-hidden rounded-[25px] bg-[#F2F6FF] p-[28px_47px_100px] text-center">
        <div className="text-[14px] leading-[18px] font-[800] text-[#343434]">
          Выполните 10 заданий за неделю и получите награду!
        </div>
        <div className="text-[10px] leading-[10px] font-[400] text-[#343434]">
          Выполнено: <span className="font-[700]">1/10</span>
        </div>

        <Icons.WeeklyBg className="absolute bottom-[-37px] left-[-58px] rounded-[30px]" />
        <Icons.WeeklyGiftBg className="absolute right-0 bottom-[-27px] left-0 m-auto" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-[25px] bg-[linear-gradient(0deg,#EDE7FF_0%,#F5F2FE_100%),linear-gradient(0deg,rgba(220,208,255,0.1),rgba(220,208,255,0.1))] p-[22px_26px]"
        >
          <div className="text-[12px] font-[700] text-[#343434]">
            Текст задания
          </div>
          <div className="flex items-center gap-[3px] text-[14px] font-[500] text-[#343434]">
            5/5
            <Icons.CheckMark />
            {/*<Icons.CheckCross />*/}
          </div>
        </div>
      ))}
      <Button className="mx-auto mt-[6px] w-[145px] !rounded-full border border-none bg-[#2B87FE] text-[12px] leading-[10px] font-[600] backdrop-blur-[10.57px]">
        Получить награду
      </Button>
    </div>
  )
}
