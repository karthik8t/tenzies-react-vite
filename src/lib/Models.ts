type Agent = 'astra' | 'breach' | 'brim' | 'jett' | 'phoenix' | 'sage' | 'sova'

interface AgentTile {
    uniqueId: string,
    agent: Agent,
    isLocked: boolean
}

interface Player {
    playerId: string,
    score: number,
    locked: number
    isCompleted: boolean,
    isActive: boolean,
    agent: Agent,
    tiles: AgentTile[]
}

type PlayerType = 'attack' | 'defend';

const agents:Agent[] = ['astra', 'breach', 'brim', 'jett', 'phoenix', 'sage', 'sova']


export {agents};
export type { Agent, AgentTile, PlayerType, Player };
