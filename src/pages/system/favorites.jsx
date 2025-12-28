import Sidebar from "../../components/components_reutilizavel/system/sidebar";
import Background from "../../components/components_reutilizavel/background";
import FavoritesComponent from "../../components/components_pages/system/favorites";

export default function Favorites() {
    return (
        <main>
            <title>Parapobre - Favorites</title>
            <Sidebar />
            <FavoritesComponent />
            <Background />
        </main>
    );
}