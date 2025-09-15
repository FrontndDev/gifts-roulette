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
  const [showAddGiftsModal, setShowAddGiftsModal] = useState(false)
  const [showUserWon, setShowUserWon] = useState(false)
  const [showReplenishment, setShowReplenishment] = useState(false)

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
      username: '@durov',
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

  const addTon = () => {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-[100] h-[74.63vw] w-[100vw] rounded-t-[50px] border-t-[1.4px] border-[#656565] bg-[#262626] p-[25px_38px_35px]">
        <div className="relative text-center text-[21px] leading-[21px] font-[400]">
          Баланс
          <Icons.Close
            className="absolute top-0 right-0 h-[24px] w-[24px] cursor-pointer"
            onClick={() => setShowAddTon(false)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <BalanceCounter
            className="mt-[13px] h-[37px] w-[107px] !border-[#656565]"
            count={11}
          />
          <CustomSlider className="w-full" />

          <div className="max-w-[213px] py-[28px] text-center text-[14px] leading-[15px] font-[400] text-[#656565]">
            Для ставки с вашего баланса будет списано 10 TON
          </div>

          <Button
            onClick={() => {
              setShowReplenishment(true)
              setShowAddTon(false)
            }}
            className="w-[140px] !rounded-full border bg-[#2B87FE] text-[15px] leading-[15px] font-[500] backdrop-blur-[10.57px]"
          >
            Поставить
          </Button>
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

      {!showUserWon && (
        <div className="relative top-[-40px] text-white">
          {/* Основной контент */}
          <div className="flex flex-col items-center gap-6 px-[51px]">
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
          <div className="mt-[20px] flex flex-row items-center justify-center gap-[20px]">
            <Button className="bg-primary !rounded-full border border-[#F7F7F7] text-[15px] font-[500]">
              Добавить Гифт
            </Button>

            {false ? (
              <Button className="w-[140px] !rounded-full border bg-[#262626] text-[15px] font-[500] backdrop-blur-[10.57px]">
                Пополнить TON
              </Button>
            ) : (
              <Button
                onClick={() => setShowAddTon(true)}
                className="w-[140px] !rounded-full border bg-[#2B87FE] text-[15px] leading-[15px] font-[500] backdrop-blur-[10.57px]"
              >
                Добавить <br /> TON
              </Button>
            )}
          </div>

          {showAddTon && addTon()}
        </div>
      )}
    </PageWrapper>
  )
}
