import { FC, useEffect, useState } from 'react'
import { cn } from '@/shared/libs'

type TimerProps = {
  className?: string
  endAt: string | Date
}

export const Timer: FC<TimerProps> = ({ className, endAt }) => {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const endTime = typeof endAt === 'string' ? new Date(endAt) : endAt

    function updateTimer() {
      const now = new Date()
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        return
      }

      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)

      setHours(String(h).padStart(2, '0'))
      setMinutes(String(m).padStart(2, '0'))
      setSeconds(String(s).padStart(2, '0'))
    }

    updateTimer()
    const timerId = setInterval(updateTimer, 1000)
    return () => clearInterval(timerId)
  }, [endAt])

  if (isExpired) return null

  return (
    <div className="flex flex-row items-center gap-1 text-sm font-medium text-white">
      {[hours, minutes, seconds].map((time, idx) => (
        <div
          key={idx}
          className={cn(
            'bg-dark-gray-card flex h-[34px] w-[30px] items-center justify-center rounded-sm',
            className,
          )}
        >
          {time}
        </div>
      ))}
    </div>
  )
}
