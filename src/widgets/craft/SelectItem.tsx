import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { useState } from 'react'

export const SelectItem = () => {
  const [selectedSubject, setSelectedSubject] = useState(true)

  return (
    <div className="flex h-[140px] w-[74.63vw] flex-col items-center justify-center rounded-[25px] border-[1px] border-[#E9E9E9] bg-[#262626] p-[19px]">
      {!selectedSubject ? (
        <div className="flex max-w-[175px] flex-col items-center gap-[12px] text-center text-[16px] leading-[16px] font-[400] text-white">
          Выбрать предмет для крафта
          <Button className="flex min-h-[35px] w-[35px] items-center justify-center rounded-[15px] border-[1px] border-[#656565] bg-[#262626] p-0">
            <Icons.Plus />
          </Button>
        </div>
      ) : (
        <div className="flex h-full w-full flex-wrap gap-[6px]">
          <div className="flex h-[47px] w-[47px] items-center justify-center rounded-[10px] bg-[#656565] text-[15.8px] leading-[9px] font-[500] text-white">
            +8
          </div>
        </div>
      )}
    </div>
  )
}
