export default function FooterComponent() {
    return (
        <footer class="bg-black/70 w-full text-white py-10 px-8 border-t border-white/5">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h4 class="text-xl font-bold">PARAPOBRE</h4>
                    <span class="text-xs text-white/40">© Kiuzo 2025</span>
                </div>

                <div class="flex gap-8 text-sm">
                    <a class="text-white/60 hover:text-white hover:underline">Github</a>
                    <a class="text-white/60 hover:text-white hover:underline">Linkedin</a>
                    <a class="text-white/60 hover:text-white hover:underline">Vercel</a>
                </div>

                <div class="flex gap-6">
                    <a href="auth/register" class="px-4 py-2 border border-white/30 rounded hover:bg-white hover:text-black transition-all duration-300 text-sm">
                        Create account
                    </a>
                    <a href="auth/login" class="px-4 py-2 bg-white text-black rounded hover:bg-white/90 transition-all duration-300 text-sm">
                        Login
                    </a>
                </div>
            </div>
        </footer>
    );
}