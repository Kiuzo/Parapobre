export default function HarrypotterComponent() {
    return (
        <section>
            <div class="relative flex flex-col justify-center items-center min-h-screen">
                <img
                    class="absolute inset-0 w-full h-full object-cover brightness-50"
                    src="https://observatoriodoaudiovisual.com.br/wp-content/uploads/2023/05/harry-potter-1.jpg"
                    alt="Harry Potter"/>

                    <div class="relative z-10 flex flex-col gap-y-8 px-4 md:px-8 text-white w-full h-full">
                        <h2 class="text-4xl md:text-6xl font-bold">HARRY POTTER</h2>

                        <p class="text-base md:text-lg max-w-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>

                        <button
                            class="border-2 rounded-md px-6 py-4 cursor-pointer w-fit
                           hover:scale-110 hover:bg-white hover:text-black transition-all duration-300">
                            Watch now!
                        </button>
                    </div>
            </div>
        </section>
    );
}