import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/libs'
import { Gift } from '@/shared/ui/gift'

export const UserWon = ({
  setShowUserWon,
  victory,
}: {
  setShowUserWon: (v: boolean) => void
  victory?: boolean
}) => {
  return (
    <div className="bg-dark-gray-card h-[80dvh] w-full rounded-[25px] p-[3.98vw_6.4vw_5.69vw_6.4vw]">
      <div className="relative">
        <div className="text-center">
          {victory && (
            <>
              Победил <br />
            </>
          )}
          @USER
        </div>
        <Icons.Close
          className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
          onClick={() => setShowUserWon(false)}
        />
      </div>
      <div className="mt-[7.5vw] grid grid-cols-[1fr_1fr_1fr_1fr] gap-[3.6vw]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Gift key={i} />
        ))}
      </div>
    </div>
  )
}
