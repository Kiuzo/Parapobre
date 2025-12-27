import HeroComponent from "@/components/components_pages/landing/hero";
import SouthparkComponent from "@/components/components_pages/landing/southpark";
import HarrypotterComponent from "@/components/components_pages/landing/harrypotter";
import CarroselComponent from "@/components/components_pages/landing/carrosel";
import FooterComponent from "@/components/components_pages/landing/footer";
import BackgroundComponent from "@/components/components_reutilizavel/background";
import Nav from "@/components/components_reutilizavel/landing/nav";

export default function Home(){
    return(
        <main>
            <title>Parapobre - Welcome</title>
            <Nav/>
            <HeroComponent/>
            <SouthparkComponent/>
            <HarrypotterComponent/>
            <CarroselComponent/>
            <FooterComponent/>
            <BackgroundComponent/>
        </main>
    );
}