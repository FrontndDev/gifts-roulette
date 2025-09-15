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
        'relative flex h-[83.8vw] w-[83.8vw] items-center justify-center rounded-[50%] border-[1px] border-[#484848]',
        status === 'wait' && 'bg-[#262626]',
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        className="absolute top-[-2.99vw] right-0 left-0 z-[2] m-auto"
      >
        <path
          d="M12.835 24.25C13.7972 25.9167 16.2028 25.9167 17.165 24.25L28.4238 4.75C29.3858 3.0835 28.1829 1.00033 26.2588 1H3.74121C1.81705 1.00033 0.614198 3.0835 1.57617 4.75L12.835 24.25Z"
          fill="url(#paint0_linear_45_1766)"
          stroke="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_45_1766"
            x1="15"
            y1="-2"
            x2="15"
            y2="29"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#585858" />
            <stop offset="1" stop-color="#BEBEBE" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-[1] flex h-[61.8vw] w-[61.8vw] items-center justify-center rounded-[50%] bg-[#101010]">
        <div className="fw-[500] flex h-[35px] w-fit items-center justify-center rounded-[15px] border-[1px] border-[#656565] p-[0_18px] text-[13px] text-[#F7F7F7]">
          {status === 'wait' ? 'Ожидание' : 'Игра'}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="38"
          viewBox="0 0 42 38"
          fill="none"
          className="absolute top-[14.5vw] left-[4.8vw]"
        >
          <circle
            cx="22.5761"
            cy="19.0258"
            r="17.5761"
            stroke="#5C5C5C"
            stroke-width="2"
            fill="#5C5C5C"
          />
          <path d="M0 4L5.42003 14.1959L11.5399 4.40407L0 4Z" fill="#5C5C5C" />
        </svg>
      </div>

      {status !== 'wait' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="83.8vw"
          height="83.8vw"
          viewBox="0 0 339 339"
          fill="none"
          className="absolute"
        >
          <rect
            x="0.25"
            y="0.25"
            width="338.5"
            height="338.5"
            rx="169.25"
            fill="#181818"
          />
          <rect
            x="0.25"
            y="0.25"
            width="338.5"
            height="338.5"
            rx="169.25"
            stroke="#BCBCBC"
            stroke-width="0.5"
          />
          <path
            d="M50.3526 288.647C26.7874 265.082 10.7394 235.058 4.23775 202.373C-2.26385 169.687 1.07301 135.807 13.8264 105.018C26.5797 74.2284 48.1768 47.9123 75.8865 29.3973C103.596 10.8823 136.174 0.999997 169.5 1L169.5 169.5L50.3526 288.647Z"
            fill="#E94DBB"
          />
          <path
            d="M338 169.5C338 210.379 323.139 249.865 296.185 280.599C269.231 311.334 232.023 331.222 191.494 336.558C150.964 341.894 109.877 332.314 75.8865 309.602C41.8964 286.891 17.322 252.597 6.74159 213.111L169.5 169.5L338 169.5Z"
            fill="#00E990"
          />
          <path
            d="M125.69 7.0021C157.906 -1.62998 191.955 -0.522582 223.533 10.1842C255.112 20.8911 282.8 40.7164 303.097 67.1533C323.394 93.5901 335.389 125.451 337.563 158.707C339.738 191.963 331.996 225.121 315.315 253.987L169.301 169.76L125.69 7.0021Z"
            fill="#1BA6FF"
          />
          <path
            d="M50.3526 288.647C26.7874 265.082 10.7394 235.058 4.23775 202.373C-2.26385 169.687 1.07301 135.807 13.8264 105.018C26.5797 74.2284 48.1768 47.9123 75.8865 29.3973C103.596 10.8823 136.174 0.999997 169.5 1L169.5 169.5L50.3526 288.647Z"
            fill="#E94DBB"
          />
          <path
            d="M338 169.5C338 210.379 323.139 249.865 296.185 280.599C269.231 311.334 232.023 331.222 191.494 336.558C150.964 341.894 109.877 332.314 75.8865 309.602C41.8964 286.891 17.322 252.597 6.74159 213.111L169.5 169.5L338 169.5Z"
            fill="#00E990"
          />
          <path
            d="M125.69 7.0021C157.906 -1.62998 191.955 -0.522582 223.533 10.1842C255.112 20.8911 282.8 40.7164 303.097 67.1533C323.394 93.5901 335.389 125.451 337.563 158.707C339.738 191.963 331.996 225.121 315.315 253.987L169.301 169.76L125.69 7.0021Z"
            fill="#1BA6FF"
          />
        </svg>
      )}
    </div>
  )
}
