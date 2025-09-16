import { Icons } from '@/shared/ui/icons'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import CustomSlider from '@/shared/ui/custom-slider'
import { Button } from '@/shared/ui/button'

interface PlaceTonProps {
  setShowReplenishment: (showReplenishment: boolean) => void
  setShowAddTon: (v: boolean) => void
}

export const PlaceTon = ({
  setShowAddTon,
  setShowReplenishment,
}: PlaceTonProps) => {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] h-[70vw] w-[100vw] rounded-t-[50px] border-t-[1.4px] border-t-[#2B2B2B] bg-[#181818] p-[20px_38px_35px]">
      <div className="relative">
        <Icons.BalanceBg className="absolute right-[-11.1vw] bottom-[-9vw] h-[70vw]" />

        <div className="relative text-center text-[21px] leading-[21px] font-[400]">
          Баланс
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={() => setShowAddTon(false)}
          />
        </div>
        <div className="z-[1 relative flex flex-col items-center justify-center">
          <BalanceCounter
            className="mt-[13px] h-[37px] w-[107px] border-[0.5px] !border-[#373737] bg-[#151515]"
            count={11}
          />
          <CustomSlider className="w-full" />

          <div className="max-w-[213px] pt-[13px] pb-[28px] text-center text-[14px] leading-[15px] font-[400] text-[#656565]">
            Для ставки с вашего баланса будет списано 10 TON
          </div>

          <div className="flex justify-center gap-[23px]">
            <Button
              onClick={() => setShowAddTon(false)}
              className="h-[45px] w-[140px] !rounded-full bg-[#262626] text-[15px] leading-[15px] font-[500] backdrop-blur-[10.57px]"
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                setShowReplenishment(true)
                setShowAddTon(false)
              }}
              className="bg-primary w-[140px] !rounded-full text-[15px] leading-[15px] font-[500] text-black backdrop-blur-[10.57px]"
            >
              Поставить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
