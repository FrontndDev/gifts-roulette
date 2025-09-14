import { PageWrapper } from '@/shared/ui/page-wrapper'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { Button } from '@/shared/ui/button'
import { Icons } from '@/shared/ui/icons'
import { useState } from 'react'
import { TabsContent } from '@/widgets/profile/TabsContent'

export function ProfilePage() {
  const [showTabs, setShowTabs] = useState(false)

  return (
    <PageWrapper back={false}>
      {showTabs && <TabsContent setShowTabs={setShowTabs} />}
      {!showTabs && (
        <div className={'flex flex-col'}>
          <div className={'flex flex-col items-center justify-center gap-3'}>
            <div
              className={
                'flex max-h-[25.62vw] min-h-[25.62vw] max-w-[25.62vw] min-w-[25.62vw] items-center justify-center rounded-full bg-gradient-to-tr from-[#E94DBB] to-[#FF85DB] text-5xl font-medium text-white'
              }
            >
              N
            </div>
            <div className={'flex flex-row items-center gap-[2.74vw]'}>
              <span className={'text-[4.98vw] font-[500] text-white'}>
                Name
              </span>
              <span
                className={'pt-0.5 text-[3.23vw] font-[500] text-[#B3B3B3]'}
              >
                ID: #26282829
              </span>
            </div>
            <div
              className={
                'flex w-full items-center gap-2 rounded-[25px] bg-[#171717] p-[2.61vw_7.11vw_2.84vw_6.87vw]'
              }
            >
              <div className={'flex flex-col gap-[2.74vw]'}>
                <span className={'text-[4.98vw] font-[500] text-white'}>
                  Баланс
                </span>
                <BalanceCounter count={11} />
              </div>
              {!false ? (
                <div
                  className={
                    'relative flex flex-col items-start gap-[3.23vw] pl-[2.49vw]'
                  }
                >
                  <div className="flex">
                    <span
                      className={
                        'relative top-[1.24vw] w-[32.59vw] text-[3.73vw] font-[500] text-[#B3B3B3]'
                      }
                    >
                      Wall......ET
                    </span>
                    <Icons.Close className={'size-3 cursor-pointer'} />
                  </div>
                  <div className="flex gap-[2.74vw]">
                    <Button
                      className={'ml-[1.49vw] w-[23.38vw] !bg-[#0075FF] px-6'}
                      shape={'circle'}
                      size={'small'}
                    >
                      Пополнить
                    </Button>
                    <Button
                      className={'w-[23.38vw] !bg-[#2B87FE] px-6'}
                      shape={'circle'}
                      size={'small'}
                    >
                      Вывод
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className={
                    'ml-auto bg-[#0075FF] px-[4.48vw] py-[3.34vw] text-[3.98vw] font-[600] whitespace-nowrap text-[#F7F7F7]'
                  }
                  shape={'circle'}
                  size={'small'}
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-[4.98vw] pt-[0.75vw]">
              <div
                className={
                  'relative flex w-full flex-row items-center gap-[1.49vw] overflow-hidden rounded-[25px] bg-gradient-to-b from-[#05D1FF] to-[#05A7FF] pt-[5.69vw] pr-[4.74vw] pb-[4.98vw] pl-[8.06vw]'
                }
              >
                <span
                  className={
                    'text-[3.98vw] leading-[4.98vw] font-[700] text-white'
                  }
                >
                  Получайте FREE Gift за выполнение заданий
                </span>
                <Button
                  className={'!bg-[#fff] px-6 !text-black'}
                  shape={'circle'}
                  size={'small'}
                  onClick={() => setShowTabs(true)}
                >
                  Выполнить
                </Button>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="68"
                  height="47"
                  viewBox="0 0 68 47"
                  fill="none"
                  className="absolute bottom-0 left-0"
                >
                  <path
                    opacity="0.21"
                    d="M33 66.1664V12.9997M19.914 12.6452C10.749 8.97836 21.7476 -9.35538 32.7489 12.6447M45.835 12.6452C55 8.97836 44.0014 -9.35538 33 12.6447M3.66738 37.9334V61.4001C3.66738 65.0452 6.6223 68.0001 10.2674 68.0001H55.7341C59.3791 68.0001 62.3341 65.0452 62.3341 61.4001V37.9334C62.3341 34.2884 59.3791 31.3334 55.7341 31.3334H10.2674C6.62231 31.3334 3.66738 34.2884 3.66738 37.9334ZM0 19.5997V24.7331C0 28.3782 2.95492 31.3331 6.6 31.3331H59.4C63.0451 31.3331 66 28.3782 66 24.7331V19.5997C66 15.9547 63.0451 12.9997 59.4 12.9997H6.6C2.95492 12.9997 0 15.9547 0 19.5997Z"
                    stroke="white"
                    stroke-width="3.3"
                  />
                </svg>
              </div>
              <div
                className={
                  'flex w-full flex-col items-center gap-[3.73vw] rounded-[25px] bg-gradient-to-b from-[#05D1FF] via-[#6479FF] to-[#8962FF] p-[4.74vw_7.11vw_2.61vw]'
                }
              >
                <span
                  className={
                    'text-center text-[4.48vw] leading-[4.98vw] font-[700] text-white'
                  }
                >
                  Приглашайте друзей и получайте 10% от их комиссий!
                </span>
                <div className={'h-px w-full bg-white/50'} />
                <div className={'grid grid-cols-2 gap-8'}>
                  <div className={'flex flex-row gap-1'}>
                    <Icons.Users className={'size-8 fill-white'} />
                    <span
                      className={
                        'text-[2.74vw] leading-[3.73vw] font-[500] text-white'
                      }
                    >
                      Приглашено <br />
                      <span className="text-[3.23vw] leading-[3.73vw] font-[900]">
                        2
                      </span>{' '}
                      <span className="text-[2.99vw]">друга</span>
                    </span>
                  </div>
                  <div className={'flex flex-row gap-[1.49vw]'}>
                    <Icons.Diamond className={'size-8 stroke-white'} />
                    <span
                      className={
                        'text-[2.74vw] leading-[3.73vw] font-[500] text-white'
                      }
                    >
                      Заработано <br />
                      <span className="text-[3.23vw] leading-[3.73vw] font-[900]">
                        20
                      </span>{' '}
                      <span className="text-[2.99vw]">TON</span>
                    </span>
                  </div>
                </div>
                <div className={'mt-1 flex flex-row items-center gap-2'}>
                  <Button
                    className={'w-[35.55vw] bg-[#FFFFFF] text-[#6D59A6]'}
                    shape={'circle'}
                    size={'small'}
                  >
                    Пригласить друга
                  </Button>
                  <Button
                    className={
                      'w-[44px] border-[1px] border-white bg-transparent'
                    }
                    shape={'circle'}
                    size={'small'}
                  >
                    <Icons.Copy className={'size-6 stroke-white'} />
                  </Button>
                </div>
              </div>
              <div
                className={
                  'relative flex w-full flex-col items-center rounded-[25px] p-[4.74vw_7.11vw_5.69vw] [background:linear-gradient(191.31deg,#6479FF_7.05%,#A554FF_50.44%,#F537FF_99.3%)]'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="70"
                  viewBox="0 0 72 70"
                  fill="none"
                  className="absolute top-[2.49vw] left-0"
                >
                  <path
                    opacity="0.1"
                    d="M3.76837 23.3295H20.2822M20.2822 23.3295L34.0014 62.7377C34.999 65.6034 38.5929 65.6034 39.5905 62.7377L53.3097 23.3295M20.2822 23.3295L30.7909 3M20.2822 23.3295H53.3097M53.3097 23.3295H69.8235M53.3097 23.3295L44.3022 3M3.90076 27.4568L32.1387 64.6336C34.5684 67.8324 38.9685 67.7804 41.3383 64.5248L68.3323 27.4406C70.0889 25.0273 70.1566 21.5718 68.4961 19.0734L59.615 5.7106C58.4809 4.00424 56.7011 3 54.811 3H17.2796C15.3895 3 13.6097 4.00424 12.4756 5.7106L3.65609 18.9808C1.96737 21.5217 2.06908 25.0453 3.90076 27.4568Z"
                    stroke="white"
                    stroke-opacity="0.63"
                    stroke-width="4.43213"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  viewBox="0 0 24 23"
                  fill="none"
                  className="absolute top-[2.49vw] left-[71.24vw]"
                >
                  <path
                    opacity="0.1"
                    d="M1.42533 7.58399H6.77354M6.77354 7.58399L11.2167 20.3469C11.5398 21.275 12.7037 21.275 13.0268 20.3469L17.47 7.58399M6.77354 7.58399L10.177 1M6.77354 7.58399H17.47M17.47 7.58399H22.8182M17.47 7.58399L14.5528 1M1.4682 8.92066L10.6134 20.9609C11.4003 21.9969 12.8254 21.98 13.5929 20.9256L22.3352 8.91541C22.9041 8.13385 22.926 7.01473 22.3883 6.20558L19.512 1.87787C19.1447 1.32524 18.5683 1 17.9562 1H5.80114C5.189 1 4.61258 1.32524 4.24529 1.87787L1.38896 6.17559C0.842048 6.9985 0.874988 8.13966 1.4682 8.92066Z"
                    stroke="white"
                    stroke-opacity="0.63"
                    stroke-width="1.43541"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  className="absolute top-[7px] right-[8px] cursor-pointer"
                >
                  <g filter="url(#filter0_d_1_11659)">
                    <path
                      d="M17.7427 18.7432C17.279 18.7432 17.0062 18.4268 17.0062 17.9795V17.9031C17.0062 17.2594 17.339 16.8339 17.9827 16.4575C18.6864 16.0374 18.8992 15.7646 18.8992 15.2628C18.8992 14.7281 18.4846 14.3572 17.8845 14.3572C17.3499 14.3572 16.9898 14.619 16.8153 15.1046C16.6789 15.4537 16.4334 15.6064 16.1006 15.6064C15.6697 15.6064 15.4023 15.3391 15.4023 14.9245C15.4023 14.6899 15.4569 14.4826 15.566 14.2753C15.9151 13.5553 16.788 13.0916 17.9609 13.0916C19.5102 13.0916 20.5521 13.9426 20.5521 15.2137C20.5521 16.0374 20.1539 16.5993 19.3847 17.0521C18.6591 17.4721 18.4955 17.7067 18.4246 18.165C18.3427 18.5305 18.13 18.7432 17.7427 18.7432ZM17.7536 21.1708C17.2626 21.1708 16.8644 20.7944 16.8644 20.3143C16.8644 19.8343 17.2626 19.4579 17.7536 19.4579C18.25 19.4579 18.6482 19.8343 18.6482 20.3143C18.6482 20.7944 18.25 21.1708 17.7536 21.1708Z"
                      fill="white"
                    />
                    <circle
                      cx="18"
                      cy="17"
                      r="8.37931"
                      stroke="white"
                      stroke-width="1.24138"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_11659"
                      x="0.6"
                      y="0.6"
                      width="36.8"
                      height="36.8"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="1" dy="2" />
                      <feGaussianBlur stdDeviation="4.7" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.698164 0 0 0 0 0.308631 0 0 0 0 0.761644 0 0 0 0.54 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_11659"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_11659"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>

                <div className={'flex flex-col items-center justify-center'}>
                  <span
                    className={
                      'text-center text-[4.48vw] leading-[4.98vw] font-[700] text-white'
                    }
                  >
                    Стейкинг (100% APR)
                  </span>
                  <span
                    className={
                      'py-[3.73vw] text-center text-[2.99vw] leading-[3.73vw] font-[400] text-[#FCFCFC]'
                    }
                  >
                    Игроки, хранящие гифты в своём инвентаре, получают долю от
                    игровой комиссии!
                  </span>
                </div>
                <div className={'h-px w-full bg-white/50'} />
                <div className={'grid grid-cols-2 gap-[7.96vw] pt-[3.73vw]'}>
                  <div className={'flex flex-row gap-[1.49vw]'}>
                    <Icons.Users className={'size-8 fill-white'} />
                    <span
                      className={'text-xs leading-tight font-medium text-white'}
                    >
                      Застейкано <br />
                      <span className="text-[3.23vw] leading-[3.73vw] font-[900]">
                        200
                      </span>{' '}
                      <span className="text-[2.99vw]">GIFT</span>
                    </span>
                  </div>
                  <div className={'flex flex-row gap-[1.49vw]'}>
                    <Icons.Diamond className={'size-8 stroke-white'} />
                    <span
                      className={
                        'text-[2.74vw] leading-[3.73vw] font-[500] text-white'
                      }
                    >
                      Заработано <br />
                      <span className="text-[3.23vw] leading-[3.73vw] font-[900]">
                        20
                      </span>{' '}
                      <span className="text-[2.99vw]">TON</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
