import RegisterComponent from "@/components/components_pages/auth/register";
import BackgroundComponent from "@/components/components_reutilizavel/background";
import NavComponent from "@/components/components_reutilizavel/landing/nav";

export default function Register(){
    return(
        <main>
            <title>Parapobre - Register</title>
            <NavComponent/>
            <RegisterComponent/>
            <BackgroundComponent/>
        </main>
    );
}