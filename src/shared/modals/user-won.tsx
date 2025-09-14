import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/libs'

export const UserWon = ({
  setShowUserWon,
  victory,
}: {
  setShowUserWon: (v: boolean) => void
  victory?: boolean
}) => {
  return (
    <div className="bg-dark-gray-card border-text h-[80dvh] w-full rounded-2xl border p-[3.98vw_6.4vw_5.69vw_6.4vw]">
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
          className="absolute top-0 right-0 h-[24px] w-[24px] cursor-pointer"
          onClick={() => setShowUserWon(false)}
        />
      </div>
      <div className="mt-[16px] flex flex-wrap gap-[2.99vw]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className={cn('relative flex cursor-pointer flex-col items-center')}
          >
            <div
              className={cn(
                'bg-text relative flex h-[14.93vw] w-[14.93vw] items-center justify-center rounded-[10px] transition-all',
              )}
            >
              <div className="text-2xl"></div>
            </div>

            <div className="mt-1 text-center">
              <span className={cn('text-text text-xs transition-all')}>
                40 TON
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
