import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { useState } from 'react'
import { cn } from '@/shared/libs'

export const SelectItem = ({
  showSelectItem,
}: {
  showSelectItem: (v: boolean) => void
}) => {
  const [selectedSubject, setSelectedSubject] = useState(false)

  return (
    <div className="flex h-[34.8vw] w-[74.63vw] flex-col items-center justify-center rounded-[25px] border-[1px] border-[#E9E9E9] bg-[#262626] p-[4.7vw]">
      {!selectedSubject ? (
        <div className="flex max-w-[43.5vw] flex-col items-center gap-[2.99vw] text-center text-[3.98vw] leading-[3.98vw] font-[400] text-white">
          Выбрать предмет для крафта
          <Button
            onClick={() => showSelectItem(true)}
            className="flex min-h-[8.7vw] w-[8.7vw] items-center justify-center rounded-[15px] border-[1px] border-[#656565] bg-[#262626] p-0"
          >
            <Icons.Plus />
          </Button>
        </div>
      ) : (
        <div className="flex h-full w-full flex-wrap gap-[1.5vw]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, idx) => (
            <div
              key={i}
              className={cn(
                'flex h-[11.69vw] w-[11.69vw] items-center justify-center rounded-[10px] bg-[#656565] text-[3.93vw] leading-[2.24vw] font-[500] text-white',
                idx !== 9 && 'opacity-0',
              )}
            >
              +8
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
