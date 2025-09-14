import { cn } from '@/shared/libs'
import { Icons } from '@/shared/ui/icons'
import { UserWon } from '@/shared/modals/user-won'

interface Player {
  id: string
  username: string
  avatar?: string
  ticketCount: number
  chance: number
  color: string
}

export interface PlayerState {
  players: Player[]
  showUserWon: boolean
  setShowUserWon: (showUserWon: boolean) => void
}

export const Players = ({
  players,
  showUserWon,
  setShowUserWon,
}: PlayerState) => {
  return (
    <div className="fw-[500] flex h-[160px] w-[74.63vw] flex-col items-center justify-center gap-[8px] rounded-[25px] border-[1px] border-[#E9E9E9] bg-[#262626] p-[11px_10px] text-[13px] text-[#F7F7F7] backdrop-blur-[16.74px]">
      {true ? (
        <>
          {players.map((player) => (
            <div
              key={player.id}
              className={cn(
                'flex h-[65px] w-full items-center rounded-[15px] border-[1px] p-[0_17px]',
                player.id === '1' ? 'border-[#EF8F00]' : 'border-[#656565]',
              )}
              onClick={() => setShowUserWon(true)}
            >
              <div className="grid w-full grid-cols-[69px_35px_103px] items-center justify-between">
                <div className="flex items-center gap-[5px]">
                  <Icons.Ton className="h-[21px] w-[21px] shrink-0 rotate-270" />
                  <div className="flex flex-col">
                    <div className="fw-[500] font-[11px]">
                      {player.username}
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="9"
                        viewBox="0 0 10 9"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.26899 0.297974H7.94743C8.16444 0.297974 8.34528 0.334142 8.56229 0.442647C8.81547 0.551152 8.96014 0.731994 9.03248 0.876668C9.03248 0.876668 9.03248 0.912836 9.06865 0.912836C9.17715 1.09368 9.24949 1.31069 9.24949 1.56387C9.24949 1.78088 9.21332 1.99789 9.06865 2.2149L5.48798 8.36352C5.41564 8.5082 5.27097 8.58053 5.09012 8.58053C4.94545 8.58053 4.80078 8.5082 4.69227 8.36352L1.18394 2.2149C1.1116 2.07022 0.966928 1.88938 0.966928 1.60004C0.93076 1.34686 1.0031 1.12985 1.1116 0.912836C1.22011 0.695826 1.40095 0.514984 1.65413 0.442647C1.87114 0.297973 2.12432 0.297974 2.26899 0.297974ZM4.6561 1.16601H2.26899C2.12432 1.16601 2.05198 1.16601 2.01581 1.20218C1.94347 1.23835 1.90731 1.27452 1.87114 1.34686C1.83497 1.38303 1.83497 1.45536 1.83497 1.5277C1.83497 1.56387 1.87114 1.60004 1.94347 1.74471L4.6561 6.4466V1.16601ZM5.52414 1.16601V6.48277L8.27294 1.74471C8.30911 1.67237 8.30911 1.60004 8.30911 1.5277C8.30911 1.45536 8.30911 1.38303 8.27294 1.34686C8.23677 1.31069 8.23677 1.27452 8.2006 1.27452L8.16444 1.23835C8.0921 1.20218 8.01976 1.20218 7.91126 1.20218H5.52414V1.16601Z"
                          fill="#0098E9"
                        />
                      </svg>
                      <div className="text-[9px]">{player.ticketCount}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-[12px] font-[500]">{player.chance}%</div>
                  <div className="text-[9px] text-[#BBBBBB]">Шанс</div>
                </div>
                <div className="flex h-[26px] w-full flex-wrap gap-[1.5px]">
                  <div
                    className={`flex h-[12px] w-[12px] items-center justify-center rounded-[3px] bg-[#656565] text-[5px]`}
                  >
                    <Icons.Bonus />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        'Игроков нет'
      )}
    </div>
  )
}
