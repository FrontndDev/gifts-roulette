import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/field'
import { Icons } from '@/shared/ui/icons'

export const BalanceWithdrawal = ({
  setShowWithdrawal,
}: {
  setShowWithdrawal: (v: boolean) => void
}) => {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] h-[70vw] w-full rounded-t-[50px] border-t-[1px] border-t-[#2B2B2B] bg-[#181818] px-[48px] pt-[58px] pb-[33px]">
      <div className="relative">
        <Icons.BalanceBg className="absolute right-[-11.1vw] bottom-[-14vw] h-[70vw]" />

        <div className="absolute top-[-30px] right-[-20px] z-1 flex h-[25px] w-[85px] items-center justify-center rounded-[2915px] border-[1px] border-[#656565] text-[10px] leading-[9px] font-[500] text-[#B0B0B0]">
          QbcWall......ET
        </div>

        <div className="relative z-1 pt-[7px] pb-[24px] text-center text-[18px] leading-[13px] font-[700] text-white">
          Вывод баланса
        </div>
        <div>
          <div className="relative">
            <Input
              className="h-[49px] w-full rounded-[5182px] bg-[#1F1F1F] pl-[52px] !placeholder-[#DBDBDB]"
              errorMessage={false}
              placeholder="Введите кол-во TON"
            />

            <Icons.BlueTon className="absolute top-0 bottom-0 left-[22px] m-auto h-[18px] w-[18px]" />
          </div>
          <div className="pt-[7px] text-center text-[10px] leading-[7px] font-[500] text-[#747474]">
            Минимальное вывод 0.1 TON
          </div>
        </div>
        <div className="flex justify-center gap-[23px] pt-[26px]">
          <Button
            onClick={() => setShowWithdrawal(false)}
            className="h-[45px] w-[140px] !rounded-full bg-[#262626] text-[15px] leading-[15px] font-[500] backdrop-blur-[10.57px]"
          >
            Отмена
          </Button>
          <Button className="bg-primary h-[45px] w-[140px] !rounded-full text-[15px] leading-[15px] font-[500] text-black backdrop-blur-[10.57px]">
            Вывод
          </Button>
        </div>
      </div>
    </div>
  )
}
