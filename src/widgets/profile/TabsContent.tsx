import { cn } from '@/shared/libs'
import { useState } from 'react'
import { Missions } from '@/widgets/profile/missions'
import { Daily } from '@/widgets/profile/daily'
import { Weekly } from '@/widgets/profile/weekly'
import { Icons } from '@/shared/ui/icons'

export const TabsContent = ({
  setShowTabs,
}: {
  setShowTabs: (v: boolean) => void
}) => {
  const tabs = [
    { value: 'missions', name: 'Миссии' },
    { value: 'daily', name: 'Ежедневные' },
    { value: 'weekly', name: 'Недельные' },
  ]
  const [selectedTab, setSelectedTab] = useState(tabs[0].value)

  return (
    <div className="relative flex flex-col gap-[9.2vw] pt-[6.72vw]">
      <Icons.Close
        className="absolute top-0 right-0 h-[19px] w-[19px] cursor-pointer"
        onClick={() => setShowTabs(false)}
      />
      <div className="m-auto flex h-[9.2vw] w-[75.12vw] items-center rounded-[1583px] bg-[#171717]">
        {tabs.map((tab, i) => (
          <div
            key={tab.value}
            className={cn(
              'flex h-full w-full cursor-pointer items-center justify-center rounded-[959px] text-center text-[2.74vw] leading-[2.24vw] font-[500] text-[#BABABA]',
              tab.value === selectedTab &&
                'bg-[linear-gradient(127.12deg,#05D1FF_17.88%,#05A8FF_71.54%)] text-white',
            )}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div className="p-[0_4.23vw]">
        {selectedTab === 'missions' && <Missions />}
        {selectedTab === 'daily' && <Daily />}
        {selectedTab === 'weekly' && <Weekly />}
      </div>
    </div>
  )
}
