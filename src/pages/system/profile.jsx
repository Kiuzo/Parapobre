import Sidebar from "../../components/components_reutilizavel/system/sidebar";
import Background from "../../components/components_reutilizavel/background";
import ProfileComponent from "../../components/components_pages/system/profile";

export default function Profile() {
    return (
        <main>
            <title>Parapobre - Profile</title>
            <Sidebar />
            <ProfileComponent />
            <Background />
        </main>
    );
}