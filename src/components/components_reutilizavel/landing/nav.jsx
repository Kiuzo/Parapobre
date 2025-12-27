export default function Nav() {
    return (
        <nav class="fixed w-full z-20">
            <div class="bg-black/70 text-white px-4 md:px-16 font-bold flex justify-between items-center py-4">
                <a class="text-2xl md:text-3xl" href="./">PARAPOBRE</a>

                <div class="flex gap-3 md:gap-6">
                    <a href="./auth/register"
                        class="px-3 py-2 md:px-4 border border-white/30 rounded
                               hover:bg-white hover:text-black transition-all duration-300
                               text-xs md:text-sm">
                        Create account
                    </a>

                    <a href="./auth/login"
                        class="px-3 py-2 md:px-4 bg-white text-black rounded
                               hover:bg-white/90 transition-all duration-300
                               text-xs md:text-sm">
                        Login
                    </a>

                </div>
            </div>
        </nav>
    );
}