import { useState } from 'react'

export default function CustomSlider({ className }: { className?: string }) {
  const [value, setValue] = useState(10)

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Слайдер */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="h-[15px] w-full cursor-pointer appearance-none rounded-lg bg-[#656565]"
        style={{
          background: `linear-gradient(to right, #00AFFF 0%, #00AFFF ${value}%, #4B5563 ${value}%, #4B5563 100%)`,
        }}
      />

      {/* Числовое значение */}
      <div className="flex h-[36px] w-[71px] shrink-0 items-center justify-center rounded-full border border-[#656565] text-[15px] leading-[8px] font-[500] text-white">
        {value}
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #00afff;
          cursor: pointer;
          border: none;
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #00afff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
