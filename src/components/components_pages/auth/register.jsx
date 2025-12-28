export default function RegisterComponent() {
    return (
        <main>
            <div class="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-24 text-white">
                <div class="w-full max-w-md bg-black/70 px-16 py-16 shadow-md rounded-xl">

                    <h1 class="text-4xl md:text-5xl font-bold text-center mb-2">
                        Parapobre
                    </h1>

                    <div class="border-2 mb-8"></div>

                    <form id="formRegister" class="flex flex-col gap-6">

                        
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
                            <span class="text-lg sm:text-xl w-full sm:w-24">Nome:</span>

                            <div class="flex-1 w-full">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    maxlength="16"
                                    placeholder="Write your name"
                                    class="text-white text-center w-full border-4 rounded-xl px-3 py-2 bg-transparent outline-none" />
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
                            <span class="text-lg sm:text-xl w-full sm:w-24">Email:</span>

                            <div class="flex-1 w-full">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxlength="50"
                                    placeholder="Your best email"
                                    class="text-white text-center w-full border-4 rounded-xl px-3 py-2 bg-transparent outline-none" />
                            </div>
                        </div>

        
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
                            <span class="text-lg sm:text-xl w-full sm:w-24">Password:</span>

                            <div class="flex-1 w-full">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    minlength="8"
                                    maxlength="16"
                                    placeholder="Your password"
                                    class="text-white text-center w-full border-4 rounded-xl px-3 py-2 bg-transparent outline-none" />
                            </div>
                        </div>

                        <div class="text-center">
                            <a href="./login.html"
                                class="text-sm text-white/80 hover:text-white underline transition">
                                I have account
                            </a>
                        </div>

                        <button
                            type="submit"
                            class="border-2 rounded-md mx-auto px-8 py-3 cursor-pointer
                           hover:scale-105 hover:bg-white hover:text-black
                           transition-all duration-300 font-semibold">
                            Create account
                        </button>

                    </form>
                </div>
            </div>
        </main>
    );
}