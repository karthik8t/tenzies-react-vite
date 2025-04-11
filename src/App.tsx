import './App.css'
import {Calendar1, ClockArrowUp} from "lucide-react";
import PlayerSelect from "@/components/tenzies/PlayerSelect.tsx";

function App() {

    return (
        <div
            className={`antialiased h-full bg-[url('./assets/maps/jett.png')] bg-no-repeat bg-cover bg-center`}
        >
            <div className={"p-4 h-screen flex flex-col text-background"}>
                <div className={"flex"}><ClockArrowUp/> <span
                    className={"ml-3"}>{new Date().toLocaleDateString()}</span>
                </div>
                <div className={"flex mt-2"}><Calendar1/> <span
                    className={"ml-3"}>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className={"w-[150px] h-[100px] bg-no-repeat bg-contain mt-3 bg-[url('./assets/spike.png')]"}></div>
                <PlayerSelect/>
            </div>
        </div>
    )
}

export default App
