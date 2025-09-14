import { cn } from '@/shared/libs'
import { useEffect, useState } from 'react'

export const Circle = () => {
  const [status, setStatus] = useState<'wait' | 'game'>('wait')

  useEffect(() => {
    setTimeout(() => {
      setStatus('game')
    }, 1000)
  }, [])

  return (
    <div
      className={cn(
        'relative flex h-[74.63vw] w-[74.63vw] items-center justify-center rounded-[50%] border-[1px] border-[#E9E9E9]',
        status === 'wait' && 'bg-[#262626]',
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        className="absolute top-[-12px] right-0 left-0 z-[2] m-auto"
      >
        <path
          d="M12.9434 24.1875C13.8575 25.7707 16.1425 25.7707 17.0566 24.1875L28.3154 4.6875C29.2294 3.10432 28.0867 1.12533 26.2588 1.125H3.74121C1.91325 1.12533 0.770642 3.10432 1.68457 4.6875L12.9434 24.1875Z"
          fill="#EF8F00"
          stroke="white"
          stroke-width="1.25"
        />
      </svg>
      <div className="relative z-[1] flex h-[54.73vw] w-[54.73vw] items-center justify-center rounded-[50%] bg-[#1F1F1F]">
        <div className="fw-[500] flex h-[35px] w-fit items-center justify-center rounded-[15px] border-[1px] border-[#656565] p-[0_18px] text-[13px] text-[#F7F7F7]">
          {status === 'wait' ? 'Ожидание' : 'Игра'}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="38"
          viewBox="0 0 42 38"
          fill="none"
          className="absolute top-[55px] left-[15px]"
        >
          <circle
            cx="22.5761"
            cy="19.0258"
            r="17.5761"
            stroke="#EF8F00"
            stroke-width="2"
          />
          <path d="M0 4L5.42003 14.1959L11.5399 4.40407L0 4Z" fill="#EF8F00" />
        </svg>
      </div>

      {status !== 'wait' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75.62vw"
          height="75.37vw"
          viewBox="0 0 304 303"
          fill="none"
          className="absolute"
        >
          <rect
            x="1.375"
            y="0.824707"
            width="301.25"
            height="301.25"
            rx="150.625"
            fill="#262626"
          />
          <rect
            x="1.375"
            y="0.824707"
            width="301.25"
            height="301.25"
            rx="150.625"
            stroke="#656565"
            stroke-width="1.25"
          />
          <rect
            x="1.375"
            y="0.824707"
            width="301.25"
            height="301.25"
            rx="150.625"
            stroke="#E9E9E9"
            stroke-width="1.25"
          />
          <rect
            x="1.375"
            y="0.824707"
            width="301.25"
            height="301.25"
            rx="150.625"
            stroke="#E9E9E9"
            stroke-width="1.25"
          />
          <path
            d="M45.934 257.516C24.9561 236.538 10.67 209.811 4.8822 180.713C-0.905584 151.616 2.06492 121.456 13.4181 94.0474C24.7712 66.6384 43.9971 43.2116 68.6645 26.7294C93.3318 10.2472 122.333 1.44989 152 1.44989L152 151.45L45.934 257.516Z"
            fill="#E94DBB"
          />
          <path
            d="M302 151.45C302 187.841 288.77 222.991 264.776 250.352C240.782 277.712 207.659 295.416 171.579 300.166C135.499 304.916 98.9227 296.388 68.6645 276.17C38.4063 255.952 16.5299 225.424 7.11113 190.273L152 151.45H302Z"
            fill="#00E990"
          />
          <path
            d="M113 6.79301C141.679 -0.891336 171.99 0.094474 200.101 9.62577C228.212 19.1571 252.86 36.8058 270.929 60.3401C288.998 83.8744 299.675 112.237 301.611 141.842C303.547 171.447 296.655 200.964 281.806 226.661L151.823 151.682L113 6.79301Z"
            fill="#1BA6FF"
          />
        </svg>
      )}
    </div>
  )
}
