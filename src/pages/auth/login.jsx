import LoginComponent from "@/components/components_pages/auth/login";
import BackgroundComponent from "@/components/components_reutilizavel/background";
import NavComponent from "@/components/components_reutilizavel/landing/nav";

export default function Login(){
    return(
        <main>
            <title>Parapobre - Login</title>
            <NavComponent/> 
            <LoginComponent/>
            <BackgroundComponent/>
        </main>
    );
}