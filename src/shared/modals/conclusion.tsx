import { Icons } from '@/shared/ui/icons'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/libs'
import { ViewState } from '@/pages/my-gifts'
import Image from 'next/image'
import TestImage from '../../../public/plush-pepe.png'

interface ConclusionProps {
  setCurrentView: (v: ViewState) => void
}

export const Conclusion = ({ setCurrentView }: ConclusionProps) => {
  return (
    <div className="flex flex-col items-center gap-[4.98vw]">
      <div className="bg-dark-gray-card flex h-[80dvh] w-full flex-col gap-[2.99vw] rounded-[25px] p-[5.21vw_10px_6.22vw]">
        <div className="relative mb-[1.49vw]">
          <div className="text-center text-[3.73vw] font-[500]">Вывод</div>
          <Icons.Close
            className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
            onClick={() => setCurrentView('gifts')}
          />
        </div>
        <div className="flex flex-col gap-[3мц] overflow-auto">
          {[1, 2, 3].map((i, idx) => (
            <div
              key={i}
              className="flex w-full gap-[1.7vw] rounded-[15px] bg-[#151515] p-[13px_21px_13px_29px]"
            >
              <div className="relative h-[17.2vw] w-[17.2vw] overflow-hidden rounded-[3vw]">
                <Image src={TestImage.src} alt="Test Image" fill />
              </div>
              <div className="flex flex-col gap-[4vw]">
                <div className="">Plush Pepe #1287</div>
                <div className="flex w-full gap-[1.5vw]">
                  {['Модель', 'Узор', 'Фон'].map((i) => (
                    <div
                      key={i}
                      className="flex h-[9.2vw] w-[14.7vw] flex-col items-center justify-center rounded-[11px] border-[1px] border-[#656565] bg-[#1A1A1A]"
                    >
                      <div className="text-[1.7vw] font-[300] text-[#979797]">
                        {i}
                      </div>
                      <div className="text-[2.2vw] font-[400] text-[#FFFFFF]">
                        Red people
                      </div>
                      <div className="text-[1.7vw] font-[500] text-[#EF8F00]">
                        1.5%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*<div className="mt-[2.74vw] text-center text-[3.73vw]">*/}
        {/*  Потребуется 150 звезд на вывод*/}
        {/*</div>*/}
      </div>
      <Button
        className={cn(
          'bg-primary m-auto h-[45px] w-fit !rounded-full text-black',
        )}
      >
        Оплата трансфера
      </Button>
    </div>
  )
}
