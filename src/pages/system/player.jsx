import Sidebar from "../../components/components_reutilizavel/system/sidebar";
import Background from "../../components/components_reutilizavel/background";
import PlayerComponent from "../../components/components_pages/system/player";

export default function Player() {
    return (
        <main>
            <title>Parapobre - Player</title>
            <Sidebar />
            <PlayerComponent />
            <Background />
        </main>
    );
}