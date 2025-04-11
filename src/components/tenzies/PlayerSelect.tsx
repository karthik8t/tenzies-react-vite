'use client'

import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import AgentGrid from "@/components/tenzies/AgentGrid";
import {Button} from "@/components/ui/button";
import {Agent, agents, AgentTile, Player, PlayerType} from "@/lib/Models";


const createAgentTiles = (): AgentTile[] => {
    const tileData : AgentTile[] = []
    for (let i = 0; i < 10; i++) {
        const data = {
            uniqueId: uuidv4(),
            agent: agents[Math.floor(Math.random() * 7)] as Agent,
            isLocked: false
        }
        tileData.push(data as AgentTile);
    }
    return tileData;
}

const createPlayer = (): Player => {
    const player : Player = {
        playerId: uuidv4(),
        score: 0,
        locked: 0,
        isCompleted: false,
        isActive: false,
        agent: 'jett' as Agent,
        tiles: createAgentTiles()
    }
    return player as Player;
}


export default function PlayerSelect() {
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("attack");
    const [attacker, setAttacker] = useState<Player>(createPlayer())
    const [defender, setDefender] = useState<Player>(createPlayer())


    useEffect(() => {
        // Trigger a re-render after the initial state is set
        setAttacker(createPlayer());
        setDefender(createPlayer());
    }, []);

    function updateTiles() {
        const currentPlayerDetails: Player = getCurrentPlayerDetails();
        if(currentPlayerDetails.isCompleted) {
            return;
        }
        const tiles: AgentTile[] = currentPlayerDetails.tiles.map(tile => {
            if (!tile.isLocked) {
                return {
                    ...tile,
                    agent: ['astra', 'breach', 'brim', 'jett', 'phoenix', 'sage', 'sova'][Math.floor(Math.random() * 7)] as Agent
                };
            }
            return tile;
        });
        currentPlayerDetails.tiles = tiles;
        currentPlayerDetails.score += 1;

        updateCurrentPlayer(currentPlayerDetails)
    }

    function lockTile(uniqueId: string, agent: string) {
        const currentPlayerDetails: Player = getCurrentPlayerDetails();
        if (currentPlayerDetails.locked !== 0 && currentPlayerDetails.agent.toString() != agent) {
            return;
        } else if (currentPlayerDetails.agent.toString() != agent) {
            currentPlayerDetails.agent = agent as Agent;
        }
        const tile = currentPlayerDetails.tiles.find(tile => tile.uniqueId === uniqueId && !tile.isLocked);
        if (tile) {
            tile.isLocked = true;
            currentPlayerDetails.locked += 1;
            if(currentPlayerDetails.locked == 10) {
                currentPlayerDetails.isCompleted = true;
            }
            updateCurrentPlayer(currentPlayerDetails);
        }
    }

    function getCurrentPlayerDetails() {
        return currentPlayer == 'attack' ? {...attacker} : {...defender};
    }

    function updateCurrentPlayer(currentPlayerDetails: Player) {
        if (currentPlayer == 'attack') {
            setAttacker(currentPlayerDetails);
        } else {
            setDefender(currentPlayerDetails);
        }
    }

    return (
        <div className={"flex-grow flex flex-col"}>
            <div className={"flex flex-row items-center gap-3  p-4 justify-between bg-[#ecfffe10] h-full"}>
                <div>
                    <Button
                        key={attacker.playerId}
                        size={"attack"}
                        className={`bg-center bg-cover ${attacker.agent ? `agent-model-${attacker.agent}`: 'agent-model-jett'}`}
                        onClick={() => setCurrentPlayer('attack')}>
                    </Button>
                    <h1 className={"text-4xl font-extrabold lg:text-4xl text-[#EBE8DB] text-center"}>Attacker</h1>
                </div>
                <div>
                    <h1 className={"text-4xl font-extrabold lg:text-6xl text-[#EBE8DB]"}>{attacker.score}</h1>
                </div>
                {attacker.isCompleted && defender.isCompleted &&
                    (<h1 className={"text-4xl font-extrabold lg:text-6xl"}>{attacker.score < defender.score ? "Attacker Won" : "Defender Won"}</h1>)
                }
                <div>
                    <h1 className={"text-4xl font-extrabold lg:text-6xl text-[#EBE8DB]"}>{defender.score}</h1>
                </div>
                <div>
                    <Button
                        key={defender.playerId}
                        size={"attack"}
                        className={`bg-center bg-cover ${defender.agent ? `agent-model-${defender.agent}`: 'agent-model-sage'}`}
                        onClick={() => setCurrentPlayer('defend')}>
                    </Button>
                    <h1 className={"text-4xl font-extrabold lg:text-4xl text-[#EBE8DB] text-center"}>Defender</h1>
                </div>
            </div>
            <div className={"flex-grow flex flex-col items-center justify-end"}>
                <Button type={"button"} onClick={updateTiles} variant={"lockup"} className={"mb-3"}>UPDATE</Button>
                <AgentGrid
                    attacker={attacker}
                    defender={defender}
                    currentPlayer={currentPlayer}
                    lockTile={(uniqueId: string, agent: string) => lockTile(uniqueId, agent)}/>
            </div>
        </div>
    );
};
