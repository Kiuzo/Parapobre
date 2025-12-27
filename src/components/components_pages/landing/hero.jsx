export default function HeroComponent() {
    return (
        <header>
            <div class="hero flex flex-col min-h-screen text-white justify-center items-center gap-8 px-4 text-center">
                <h1 class="text-4xl md:text-6xl sm:text-2xl font-bold">
                    WELCOME TO<br />PARAPOBRE
                </h1>

                <p class="text-sm max-w-2xl">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non molestias beatae impedit.
                </p>

                <button
                    class="border-2 rounded-md px-6 py-4 cursor-pointer w-fit
                       hover:scale-110 transition duration-300">
                    Create account
                </button>
            </div>
        </header>
    );
}