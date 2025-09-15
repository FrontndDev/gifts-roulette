import { useState, useEffect } from 'react'
import { PageWrapper } from '@/shared/ui/page-wrapper'
import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/libs'
import { Modal, ModalContent } from '@/shared/ui/modal'
import { Players } from '@/widgets/home/players'
import { Circle } from '@/widgets/home/circle'
import { GameHash } from '@/features/home/game-hash'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import CustomSlider from '@/shared/ui/custom-slider'
import { UserWon } from '@/shared/modals/user-won'
import { BalanceReplenishment } from '@/widgets/home/balance-replenishment'
import { PlaceTon } from '@/widgets/home/place-ton'
import { Inventory } from '@/shared/modals/inventory'

interface Player {
  id: string
  username: string
  avatar?: string
  ticketCount: number
  chance: number
  color: string
}

export function HomePage() {
  const [gameState, setGameState] = useState<'waiting' | 'active' | 'spinning'>(
    'waiting',
  )
  const [timeLeft, setTimeLeft] = useState(15)
  const [showAddTon, setShowAddTon] = useState(false)
  const [showUserWon, setShowUserWon] = useState(false)
  const [showReplenishment, setShowReplenishment] = useState(false)
  const [showInventory, setShowInventory] = useState(false)

  // Моковые данные игроков
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      username: '@me',
      ticketCount: 100,
      chance: 35,
      color: '#FF6B9D', // Розовый
    },
    {
      id: '2',
      username: '@notme',
      ticketCount: 100,
      chance: 35,
      color: '#4ECDC4', // Бирюзовый
    },
  ])

  const userBalance = 3000 // Моковый баланс
  const gifts = 299 // Количество подарков
  const participants = 3

  // Эффект таймера
  useEffect(() => {
    if (gameState === 'waiting' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('spinning')
      // Через 3 секунды показать результат
      setTimeout(() => {
        setGameState('active')
        setTimeLeft(15)
      }, 3000)
    }
  }, [timeLeft, gameState])

  // Расчет углов для сегментов круга
  const getSegmentPath = (
    startAngle: number,
    endAngle: number,
    radius: number = 90,
  ) => {
    const centerX = 100
    const centerY = 100

    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  const renderGameCircle = () => {
    // if (gameState === 'waiting') {
    //   return <Circle />
    // }

    // Активная игра с сегментами
    let currentAngle = -Math.PI / 2 // Начинаем сверху
    const segments: any = []

    players.forEach((player, index) => {
      const segmentAngle = (player.chance / 100) * 2 * Math.PI
      const endAngle = currentAngle + segmentAngle

      segments.push(
        <path
          key={player.id}
          d={getSegmentPath(currentAngle, endAngle)}
          fill={player.color}
          className="transition-all duration-300"
        />,
      )

      currentAngle = endAngle
    })

    return (
      <div className="relative">
        <svg
          width="300"
          height="300"
          viewBox="0 0 200 200"
          className={cn(
            'transition-transform duration-3000',
            gameState === 'spinning' && 'animate-spin',
          )}
        >
          {segments as any}
        </svg>

        {/* Указатель */}
        <div className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[20px] border-r-[12px] border-l-[12px] border-t-[#EF8F00] border-r-transparent border-l-transparent" />

        {/* Центральная область с таймером */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-dark-gray rounded-full p-4">
            {gameState === 'spinning' ? (
              <div className="text-lg font-medium text-white">Вращение...</div>
            ) : (
              <div className="text-lg font-medium text-white">
                0:{timeLeft.toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageWrapper back={false}>
      {showUserWon && (
        <UserWon setShowUserWon={setShowUserWon} victory={false} />
      )}
      {showReplenishment && (
        <BalanceReplenishment setShowReplenishment={setShowReplenishment} />
      )}

      {showInventory && (
        <Inventory
          closeInventory={() => setShowInventory(false)}
          add={() => {}}
        />
      )}

      {!showUserWon && !showInventory && (
        <div className="relative top-[-40px] text-white">
          {/* Основной контент */}
          <div className="flex w-full flex-col items-center gap-6">
            {/* Игровой круг */}
            <div className="flex flex-col items-center gap-4">
              {/*{renderGameCircle()}*/}
              <Circle />

              {/* Статистика */}
              <div className="flex items-center gap-[15px] text-sm">
                <div className="flex items-center gap-1.5">
                  <Icons.Users className="size-[24px] fill-white" />
                  <span>{participants}</span>
                </div>
                <div className={'h-[30px] w-px bg-[#636363]'} />
                <div className="flex items-center gap-1.5">
                  <Icons.GiftFilled className="size-[23px] fill-white" />
                  <span>{gifts}</span>
                </div>
                <div className={'h-[30px] w-px bg-[#636363]'} />
                <div className="flex items-center gap-1.5">
                  <Icons.ClearedTon className="size-[18px]" />
                  <span>{userBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Сообщение о состоянии */}
            <Players
              players={players}
              showUserWon={showUserWon}
              setShowUserWon={setShowUserWon}
            />
          </div>

          <GameHash className="mt-[21px]" />

          {/* Нижние кнопки */}
          <div className="mt-[20px] flex flex-row items-center justify-center gap-[9px]">
            <Button
              onClick={() => setShowInventory(true)}
              className="w-[39.8vw] gap-0 !rounded-full bg-[#00EF93] p-0 text-[15px] leading-[0.5] font-[600] text-black"
            >
              <Icons.Gift className="h-[25px] w-[25px] [&_path]:!stroke-black" />
              Добавить Гифт
            </Button>

            {false ? (
              <Button className="w-[39.8vw] !rounded-full border bg-[#262626] text-[15px] leading-[0.5] font-[600] backdrop-blur-[10.57px]">
                Пополнить TON
              </Button>
            ) : (
              <Button
                onClick={() => setShowAddTon(true)}
                className="w-[39.8vw] gap-0 !rounded-full border bg-[#3AB0FC] p-0 text-[15px] leading-[0.5] leading-[15px] font-[600] text-black backdrop-blur-[10.57px]"
              >
                <Icons.Ton className="h-[30px] w-[30px] [&_path]:!fill-black" />
                Добавить TON
              </Button>
            )}
          </div>

          {showAddTon && (
            <PlaceTon
              setShowAddTon={setShowAddTon}
              setShowReplenishment={setShowReplenishment}
            />
          )}
        </div>
      )}
    </PageWrapper>
  )
}
